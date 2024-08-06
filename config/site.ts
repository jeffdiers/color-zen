export const siteConfig = {
  name: "Color Zen",
  url: "",
  ogImage: "",
  description: "Create and save color palettes",
  externalLinks: {
    github: "https://github.com/jeffdiers/color-zen",
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
