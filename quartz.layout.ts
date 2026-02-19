import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Flex({
      direction: "row",
      gap: "0",
      components: [
        { Component: Component.PageTitle(), shrink: false },
        { 
          Component: Component.Flex({
            direction: "row",
            gap: "0.5rem",
            components: [
              { Component: Component.HeaderButton({ text: "Knowledge", link: "/knowledge" }) },
              { Component: Component.HeaderButton({ text: "Project", link: "/project" }) },
              { Component: Component.HeaderButton({ text: "Log", link: "/log" }) },
              { Component: Component.HeaderButton({ text: "About", link: "/about" }) },
            ]
          })
        },
        { 
          Component: Component.Flex({
            direction: "row",
            gap: "1rem",
            components: [
              // { Component: Component.GithubLink({ url: "https://github.com/32YOGURT" }) },
              { Component: Component.Darkmode() },
              { Component: Component.Search() },
            ]
          })
        },
      ],
    }),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/32YOGURT",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !["index", "knowledge", "project", "log"].includes(page.fileData.slug ?? ""),
    }),
    Component.TagList(),
  ],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({ 
        title: "최근 게시글",
        limit: 5,
        showTags: true,
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
  left: [], // 2단 레이아웃: 좌측 사이드바 없음
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !["index", "knowledge/index", "project/index", "log/index"].includes(page.fileData.slug ?? ""),
    }),
  ],
  afterBody: [],
  left: [], // 2단 레이아웃: 좌측 사이드바 없음
  right: [],
}
