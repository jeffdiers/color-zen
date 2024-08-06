export const siteConfig = {
  name: "Color Palettes",
  url: "",
  ogImage: "",
  description: "Create and save color palettes",
  externalLinks: {
    github: "https://github.com/jeffdiers/kickoff-color-picker-2023-08-08",
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
