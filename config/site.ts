export const siteConfig = {
  name: "Color Zen",
  url: "",
  ogImage: "",
  description: "Create and save color palettes",
  brandPalette: ["#8A2BE2", "#BA55D3", "#FF6347", "#FFA07A", "#34a07a"],
  externalLinks: {
    github: "https://github.com/jeffdiers/color-zen",
    author: "https://jeffdiers.com",
  },
  navLinks: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Create",
      href: "/create",
    },
    {
      title: "Gallery",
      href: "/gallery",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
