"use client";

import { usePalette } from "@/context/palette-context";
import { ColorPicker } from "@/components/color-picker";
import { useEffect } from "react";
import { PaletteControls } from "./palette-controls";
import { Button } from "./ui/button";
import { cn, isContrastDark } from "@/lib/utils";
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { Icons } from "./icons";

interface PaletteGeneratorProps {
  presetColors?: string[];
}

export function PaletteGenerator({ presetColors }: PaletteGeneratorProps) {
  const { colors, setColors, lockedColors, toggleColorLock, randomizeColors } =
    usePalette();

  // Set the colors to the preset colors if they exist, otherwise randomize
  useEffect(() => {
    if (presetColors) {
      setColors(presetColors);
    } else {
      randomizeColors();
    }
  }, [presetColors]);

  // Function to update a specific color in the palette
  const updateColor = (index: number, newColor: string) => {
    const newColors = [...(colors ?? [])];
    newColors[index] = newColor;
    setColors(newColors);
  };

  if (!colors) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <Icons.spinner className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row w-full h-[calc(100vh-3.5rem)]">
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-grow h-full flex flex-col items-center justify-center sm:justify-end w-full sm:w-[calc(100%/5)] group sm:pb-24"
          style={{ backgroundColor: color }}
        >
          <Button
            variant="ghost"
            onClick={() => toggleColorLock(index)}
            className={cn(
              "sm:hidden group-hover:block",
              isContrastDark(color) ? "text-black" : "text-white"
            )}
          >
            {lockedColors[index] ? (
              <LockClosedIcon className="h-6 w-6" />
            ) : (
              <LockOpen1Icon className="h-6 w-6" />
            )}
          </Button>
          <ColorPicker
            hex={color}
            setHex={(newColor) => updateColor(index, newColor)}
            triggerButton={
              <Button
                variant="ghost"
                className={cn(
                  "uppercase font-bold text-xl",
                  isContrastDark(color) ? "text-black" : "text-white"
                )}
              >
                {color}
              </Button>
            }
          />
        </div>
      ))}
      <div className="sm:hidden block items-center justify-center my-8 w-full">
        <PaletteControls useCommands={false} />
      </div>
    </div>
  );
}
