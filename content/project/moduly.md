---
uuid: 20260219143016
publish: true
tags: [moduly]
---

## what is moduly?
moduly는 **자가 호스팅형 LLM 어플리케이션 개발 플랫폼**입니다. 복잡한 실행 과정을 노드들의 연결로 단순화하고, 이를 오픈소스로 공개해 사용자가 self-hosting할 수 있도록 돕습니다.

![[Pasted image 20260219144830.png]]

## 프로젝트 배경
LLM 기반 어플리케이션 개발이 대중화되었지만, 다음과 같은 장벽이 존재합니다.
- 비개발자의 접근성: 비개발자는 여전히 구현의 어려움 때문에 한계가 있습니다.
- 개발자의 반복 작업: 개발자는 반복적인 작업 때문에 오랜 시간과 에너지를 소모합니다. 

## 핵심 목표
**Moduly**는 이런 복잡한 LLM 워크플로우 제작 과정을 drag & drop 기반의 시각적 인터페이스를 통해 쉽고 간단하게 만듭니다. Moduly의 핵심 목표는 다음과 같이 요약할 수 있습니다. 

1. 복잡한 LLM 워크플로우를 시각적으로 설계하고 자동화하여, 누구나 고도화된 AI 에이전트 서비스를 구축할 수 있도록 돕습니다.
    
2. Kubernetes(EKS) 기반의 마이크로서비스 아키텍처와 Celery 비동기 분산 처리를 채택하여, 대규모 태스크 실행 시에도 높은 안정성과 유연한 확장성을 보장합니다.
    
3. 단순한 프롬프트 실행을 넘어 벡터 데이터베이스와 외부 API 연동을 통해 사용자가 다양한 워크플로우를 커스텀할 수 있도록 돕습니다.

## 기술 스택 & 시스템 아키텍쳐

| **Layer**      | **Tech Stack**       | **Reason for Choice**                    |
| -------------- | -------------------- | ---------------------------------------- |
| **Frontend**   | Next.js, React Flow  | 노드 기반의 동적인 UI 구현 및 SEO/초기 로딩 최적화         |
| **Backend**    | FastAPI (Python)     | LLM, Vector DB 등 파이썬 생태계 라이브러리와의 높은 호환성  |
| **Task Queue** | Redis, Celery        | 무거운 LLM 호출 작업을 비동기로 분산 처리하여 사용자 대기 시간 감소 |
| **Database**   | PostgreSQL, pgVector | 정형 데이터 관리 및 RAG를 위한 고성능 벡터 검색 환경 구축      |
| **Infra**      | AWS EKS, Docker      | MSA 구조의 컨테이너 오케스트레이션 및 확장성 확보            |

시스템 아키텍쳐는 아래와 같습니다. 

![[Pasted image 20260219151111.png]]

AWS EKS를 활용해 **쿠버네티스 환경**을 구현하였습니다. 
- 오픈소스 배포를 위한 표준화 등을 이유로 k8s를 도입했습니다.
- 자세한 내용은 [[쿠버네티스 in moduly]]를 참고해주세요. 

redis를 Message Queue로 활용해 **비동기 메시징 시스템 아키텍쳐를** 구현하였습니다.
- 메인 API service는 실제로 워크플로우를 실행하지 않고, 실행 요청만 Message Queue에 적재하기 때문에 사용자에게 끊김없는 서비스를 제공할 수 있습니다.
- moduly를 통해 제작한 워크플로우를 외부에 공개하는 기능이 있기 때문에, 실제 웹 사용자는 많지 않더라도 워크플로우 실행 요청은 많을 수 있다고 판단했습니다. 
- 또한 워크플로우 실행은 외부 API 요청, 텍스트 추출, 로그 처리 등등 부하가 심한 작업이 많아, 비동기 메시징 시스템이 효율적일 것이라 판단하였습니다.

**pgvector** 기반의 RAG 시스템, **NSJail** 기반의 코드 노드 실행 시스템을 구축했습니다.
- postgreSQL를 사용하고 있었기 때문에, pgvector가 관리가 용이하다고 판단했습니다.
- 컨테이너 생성/삭제에 따른 오버헤드를 줄이기 위해, NSJail 기반의 프로세스 단위 격리 환경을 구축했습니다.

## 프로젝트 정보
- 진행 기관: 크래프톤 정글 (Krafton Jungle)
- 기간: 2025.12.12 ~ 2026.01.24 (약 5주)
- 팀 구성: 6명
- 나의 역할
	- **Infra**: AWS EKS 기반 쿠버네티스 환경 구축 & 오픈소스 배포 표준화
	- **Backend**: NodeFactory 기반 공통 컴포넌트 및 API Orchestration 엔진 구축 & 비동기 메시징 아키텍쳐 설계 및 구현
	- **Frontend**: 제작된 워크플로우를 배포 및 실행할 수 있는 인터페이스 구현

---

https://moduly-ai.cloud (moduly 링크)

https://github.com/jungle-scope/moduly (github)

https://soyoungahn2706.atlassian.net/jira/software/projects/KAN/boards/1 (jira)

https://soyoungahn2706.atlassian.net/wiki/spaces/~5570584be38c05e96e42fa9a9fdf0877980985/overview?homepageId=229464 (confluence)
