# 옵시디언 -> quartz 동기화 스크립트

import os
import shutil
import re
from pathlib import Path

# ==========================================
# ⚙️ 경로 설정 (본인 환경에 맞게 반드시 수정하세요!)
# ==========================================
OBSIDIAN_DIR = "/Obsidian"
QUARTZ_CONTENT_DIR = "/Users/조한희/Desktop/coding/blog/content"
ATTACHMENT_DIR_NAME = "이미지"
# ==========================================


def get_frontmatter(file_path: Path):
    """파일에서 uuid와 publish 여부를 추출합니다."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            # Frontmatter (--- ... ---) 영역 추출
            match = re.search(r"^---\s*(.*?)\s*---", content, re.DOTALL | re.MULTILINE)
            if not match:
                return None, False

            yaml_content = match.group(1)
            uuid_match = re.search(
                r'^uuid:\s*["\']?([\w-]+)["\']?', yaml_content, re.MULTILINE
            )
            publish_match = re.search(
                r"^publish:\s*true\b", yaml_content, re.IGNORECASE | re.MULTILINE
            )

            return (uuid_match.group(1) if uuid_match else None), bool(publish_match)
    except Exception:
        return None, False


def sync():
    src_path = Path(OBSIDIAN_DIR)
    dest_path = Path(QUARTZ_CONTENT_DIR)

    # 경로 검증
    if not src_path.exists():
        print(f"❌ [에러] 옵시디언 경로를 찾을 수 없습니다: {src_path}")
        return

    # 1. 현재 Quartz에 있는 파일들의 UUID 맵 생성 (위치 추적용)
    #    Key: UUID, Value: Path (Quartz 내의 절대 경로)
    quartz_uuid_map = {}
    for q_file in dest_path.rglob("*.md"):
        q_uuid, _ = get_frontmatter(q_file)
        if q_uuid:
            quartz_uuid_map[q_uuid] = q_file

    # 2. 옵시디언에서 발행할 파일들 확인 및 복사
    current_published_uuids = set()
    copied_count = 0
    renamed_count = 0
    new_file_count = 0

    print("🚀 동기화 시작 (폴더 구조 무시 모드)...")
    for md_file in src_path.rglob("*.md"):
        # 숨김 폴더(.obsidian, .git 등) 무시
        if any(part.startswith(".") for part in md_file.parts):
            continue

        obs_uuid, is_publish = get_frontmatter(md_file)

        if is_publish and obs_uuid:
            current_published_uuids.add(obs_uuid)

            # 대상 경로 결정 로직
            if obs_uuid in quartz_uuid_map:
                # 이미 Quartz에 존재하는 파일 -> 기존 위치 유지
                target_path = quartz_uuid_map[obs_uuid]

                # 파일명이 변경되었는지 확인 (UUID는 같으나 이름이 다름)
                if target_path.name != md_file.name:
                    new_target_path = target_path.parent / md_file.name
                    print(
                        f"🔄 이름 변경 감지: {target_path.name} -> {new_target_path.name}"
                    )

                    # 기존 파일 삭제 후 새 이름으로 저장할 경로 설정
                    # (shutil.copy2가 덮어쓰기 하므로 move 대신 copy 후 삭제가 안전할 수 있음)
                    if target_path.exists():
                        target_path.unlink()
                    target_path = new_target_path
                    renamed_count += 1
            else:
                # Quartz에 없는 새 파일 -> content 최상위(루트)에 저장
                target_path = dest_path / md_file.name
                new_file_count += 1

            # 파일 복사 (내용 업데이트)
            target_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(md_file, target_path)
            copied_count += 1

    # 3. 발행 취소된 파일 정리 (옵시디언엔 있지만 publish: false가 된 경우)
    deleted_count = 0
    for q_uuid, q_path in quartz_uuid_map.items():
        if q_uuid not in current_published_uuids:
            if q_path.exists():
                q_path.unlink()
                print(f"🗑️ 발행 취소/삭제됨: {q_path.relative_to(dest_path)}")
                deleted_count += 1

    # 4. 에셋(이미지) 복사 - 이미지는 폴더 구조 유지 (깨짐 방지)
    asset_src = src_path / ATTACHMENT_DIR_NAME
    if asset_src.exists() and asset_src.is_dir():
        # 에셋 폴더는 통째로 동기화 (기존 것 지우고 다시 복사 or 업데이트)
        # 여기서는 간단하게 덮어쓰기 모드로 복사
        shutil.copytree(asset_src, dest_path / ATTACHMENT_DIR_NAME, dirs_exist_ok=True)

    print("-" * 50)
    print(
        f"✨ 완료! 업데이트: {copied_count} | 신규: {new_file_count} | 이름변경: {renamed_count} | 삭제: {deleted_count}"
    )
    print(f"🛡️ Quartz 내의 폴더 구조는 유지되었습니다.")


if __name__ == "__main__":
    sync()
