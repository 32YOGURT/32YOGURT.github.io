import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  components?: QuartzComponent[]
}

export default ((opts?: Options) => {
  const CustomHeader: QuartzComponent = (props: QuartzComponentProps) => {
    const components = opts?.components ?? []
    
    return (
      <header class="custom-header">
        <div class="header-content">
          {components.map((Component, index) => (
            <Component key={index} {...props} />
          ))}
        </div>
      </header>
    )
  }

  CustomHeader.css = `
  .custom-header {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: var(--light);
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
  }

  /* 페이지 타이틀 스타일 */
  .custom-header .page-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
    text-decoration: none;
    margin: 0;
    padding: 0;
  }

  .custom-header .page-title:hover {
    color: var(--secondary);
  }

  /* Spacer */
  .custom-header .spacer {
    flex: 1;
  }

  /* 우측 컴포넌트들 정렬 */
  .custom-header .search,
  .custom-header .darkmode,
  .custom-header .github-link {
    display: flex;
    align-items: center;
  }

  /* 모바일 반응형 */
  @media (max-width: 768px) {
    .header-content {
      padding: 0.75rem 1rem;
      gap: 0.5rem;
    }

    .custom-header .page-title {
      font-size: 1rem;
    }
  }
  `

  return CustomHeader
}) satisfies QuartzComponentConstructor
