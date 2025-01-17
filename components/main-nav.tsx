"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-1 lg:mr-6">
        <Icons.logo className="h-7 w-7" />
        <span className="hidden lg:inline-block font-bold">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {siteConfig.navLinks.map(
          (link) =>
            link.href !== "/" && (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  pathname.includes(link.href)
                    ? "text-blue-500"
                    : "text-muted-foreground"
                )}
              >
                {link.title}
              </Link>
            )
        )}
      </nav>
    </div>
  );
}
