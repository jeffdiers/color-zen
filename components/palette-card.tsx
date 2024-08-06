"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DotsHorizontalIcon,
  MagicWandIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { DeleteDialogContent } from "./delete-confirm-dialog";
import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { SavePaletteContent } from "./save-palette-dialog";

interface PaletteCardProps {
  id: string;
  palette: string[];
  name: string;
}

export function PaletteCard({ id, palette, name }: PaletteCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<"delete" | "save">(
    "delete"
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Link
        href={"/palette/" + id}
        className="rounded-lg hover:shadow-xl hover:ring hover:border-ring hover:ring-offset-4 hover:ring-offset-background hover:border-border-hover transition-all duration-300"
      >
        <div className="flex flex-row">
          {palette.map((color, index) => (
            <div
              key={index}
              className={cn(
                "flex-grow h-24 border",
                index === 0
                  ? "rounded-tl-lg rounded-bl-lg border-r-0"
                  : "border-l-0",
                index === palette.length - 1
                  ? "rounded-tr-lg rounded-br-lg border-l-0"
                  : "border-r-0"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex flex-row items-center justify-between capitalize p-2">
          <h3 className="text-lg md:text-xl font-semibold leading-none tracking-tight">
            {name}
          </h3>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2 h-1">
                <DotsHorizontalIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={"/create/" + id}>
                <DropdownMenuItem>
                  <MagicWandIcon className="w-5 h-5 mr-2" />
                  <span>Create</span>
                </DropdownMenuItem>
              </Link>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    setDialogContent("save");
                    setDialogOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  <Pencil2Icon className="w-5 h-5 mr-2" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    setDialogContent("delete");
                    setDialogOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  <TrashIcon className="w-5 h-5 mr-2 text-destructive" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>
      {dialogContent === "delete" && (
        <DeleteDialogContent id={id} setDialogOpen={setDialogOpen} />
      )}
      {dialogContent === "save" && (
        <SavePaletteContent
          id={id}
          name={name}
          colors={palette}
          setSaveDialogOpen={setDialogOpen}
        />
      )}
    </Dialog>
  );
}
