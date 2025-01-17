import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Thank you for visiting. Created by{" "}
          <a
            href={siteConfig.externalLinks.author}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Jeff Diers
          </a>
          . You can find the source code for this project on{" "}
          <a
            href={siteConfig.externalLinks.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
