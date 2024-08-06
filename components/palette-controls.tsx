import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalKeyListener } from "@/hooks/useGlobalKeyListener";
import { HeartIcon, SymbolIcon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { SavePaletteContent } from "./save-palette-dialog";
import { usePalette } from "@/context/palette-context";

export function PaletteControls({ useCommands = true }) {
  const { name, colors, randomizeColors } = usePalette();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  useGlobalKeyListener((e: KeyboardEvent) => {
    if (
      !useCommands ||
      (e.target instanceof HTMLElement && e.target.isContentEditable) ||
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      setSaveDialogOpen(true);
    } else if (e.key === " ") {
      e.preventDefault();
      randomizeColors();
    }
  });

  return (
    <div className="flex flex-row items-center justify-center gap-2 mr-2">
      <Button onClick={randomizeColors} variant="ghost" className="h-8 px-2">
        <SymbolIcon className="h-4 w-4" />
        <span className="mx-1">Random</span>
        <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">Space</span>
        </kbd>
      </Button>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="h-8 px-2">
            <HeartIcon className="h-4 w-4" />
            <span className="mx-1">Save</span>
            <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>S
            </kbd>
          </Button>
        </DialogTrigger>
        {colors && (
          <SavePaletteContent
            name={name}
            colors={colors}
            setSaveDialogOpen={setSaveDialogOpen}
          />
        )}
      </Dialog>
    </div>
  );
}
