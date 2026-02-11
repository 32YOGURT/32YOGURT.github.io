import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface HeaderButtonOptions {
  text: string
  link?: string
}

export default ((opts: HeaderButtonOptions) => {
  const HeaderButton: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const { text, link } = opts
    
    return (
      <a href={link || "#"} class={`header-button ${displayClass ?? ""}`}>
        {text}
      </a>
    )
  }

  HeaderButton.css = `
  .header-button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background-color: transparent;
    color: var(--darkgray);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    
    &:hover {
      background-color: var(--lightgray);
      color: var(--dark);
      border-color: var(--gray);
    }
  }
  `

  return HeaderButton
}) satisfies QuartzComponentConstructor<HeaderButtonOptions>
