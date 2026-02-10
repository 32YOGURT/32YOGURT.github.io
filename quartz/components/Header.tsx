import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = `
/* CustomHeader가 레이아웃을 전담하므로 기본 스타일만 유지 */
header {
  margin: 0;
  padding: 0;
}
`

export default (() => Header) satisfies QuartzComponentConstructor
