"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import {
  GlobeIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { siteConfig } from "@/config/site";
import type { Palette } from "@prisma/client";
import useDebounce from "@/hooks/useDebounce";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [palettes, setPalettes] = React.useState<Palette[]>([]);
  const { setTheme } = useTheme();

  const themeOptions = [
    {
      title: "Light",
      action: () => setTheme("light"),
      Icon: SunIcon,
    },
    {
      title: "Dark",
      action: () => setTheme("dark"),
      Icon: MoonIcon,
    },
    {
      title: "System",
      action: () => setTheme("system"),
      Icon: LaptopIcon,
    },
  ];

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (open) {
      // Fetch palettes based on the search query
      const fetchPalettes = async () => {
        try {
          const response = await fetch(
            `/api/palette?search=${encodeURIComponent(debouncedSearchQuery)}`
          );
          if (response.ok) {
            const data = await response.json();
            setPalettes(data);
          } else {
            console.error("Failed to fetch palettes");
          }
        } catch (error) {
          console.error("Error fetching palettes:", error);
        }
      };

      fetchPalettes();
    }
  }, [open, debouncedSearchQuery]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  // Filter function to exclude `Links` and `Theme` items based on searchQuery
  const filterItems = (items: any[], searchQuery: string) =>
    items.filter(
      (item: { title: string }) =>
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">
          Search {siteConfig.name}...
        </span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search for a command or a color palette
        </DialogDescription>
        <CommandInput
          placeholder="Type a command or search for a color palette..."
          onValueChange={(value) => setSearchQuery(value)}
        />
        <CommandList>
          <CommandEmpty>No results...</CommandEmpty>
          {filterItems(siteConfig.navLinks, debouncedSearchQuery).length >
            0 && (
            <CommandGroup heading="Links">
              {filterItems(siteConfig.navLinks, debouncedSearchQuery).map(
                ({ href, title }: { href: string; title: string }) => (
                  <CommandItem
                    key={href}
                    value={title}
                    onSelect={() => runCommand(() => router.push(href))}
                  >
                    <GlobeIcon className="mr-2 h-4 w-4" />
                    {title}
                  </CommandItem>
                )
              )}
            </CommandGroup>
          )}
          <CommandSeparator />
          {filterItems(themeOptions, debouncedSearchQuery).length > 0 && (
            <CommandGroup heading="Theme">
              {filterItems(themeOptions, debouncedSearchQuery).map(
                ({ title, action, Icon }) => (
                  <CommandItem key={title} onSelect={() => runCommand(action)}>
                    <Icon className="mr-2 h-4 w-4" />
                    {title}
                  </CommandItem>
                )
              )}
            </CommandGroup>
          )}
          <CommandSeparator />
          {palettes.length > 0 && (
            <CommandGroup heading="Color Palettes">
              {palettes.map((palette) => (
                <CommandItem
                  key={palette.id}
                  onSelect={() =>
                    runCommand(() => {
                      router.push(`/palette/${palette.id}`);
                    })
                  }
                >
                  <span
                    className="mr-2 w-4 h-4 inline-block"
                    style={{ backgroundColor: palette.hexColors[0] }}
                  />
                  {palette.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
