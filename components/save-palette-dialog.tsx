"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrUpdatePalette } from "@/lib/actions";
import { ColorPicker } from "./color-picker";
import { DotFilledIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { cn, isContrastDark } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  colors: z.array(z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)),
});

interface SavePaletteContentProps {
  id?: string;
  name?: string;
  colors: string[];
  setSaveDialogOpen: (open: boolean) => void;
}

export function SavePaletteContent({
  id,
  name: prevName,
  colors: initialColors = [],
  setSaveDialogOpen,
}: SavePaletteContentProps) {
  const { toast } = useToast();

  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: prevName || "",
      colors: initialColors,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createOrUpdatePalette(id, values.name, values.colors);
    setSaveDialogOpen?.(false);
    toast({
      title: "Palette Saved",
      description: `Palette "${values.name}" has been saved.`,
    });
  }

  useEffect(() => {
    form.setValue("colors", initialColors);
  }, [initialColors]);

  useEffect(() => {
    const newColors = [...form.getValues("colors")];
    form.setValue(
      `colors.${selectedColorIndex}`,
      newColors[selectedColorIndex]
    );
  }, [selectedColorIndex, form]);

  const handleColorChange = (color: string) => {
    const newColors = [...form.getValues("colors")];
    newColors[selectedColorIndex] = color;
    form.setValue("colors", newColors);
  };

  const handleColorClick = (index: number) => {
    setSelectedColorIndex(index);
  };

  return (
    <DialogContent
      onOpenAutoFocus={(e) => e.preventDefault()} // disable autofocus
      className="sm:max-w-[425px]"
    >
      <DialogHeader>
        <DialogTitle>Save Palette</DialogTitle>
        <DialogDescription>
          Name your color palette and save it.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex w-full mt-2">
            {form.watch("colors").map((color, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-center flex-grow h-24 cursor-pointer border group",
                  index === 0 ? "rounded-tl-lg rounded-bl-lg border-r-0" : "",
                  index === form.watch("colors").length - 1
                    ? "rounded-tr-lg rounded-br-lg border-l-0"
                    : "border-l-0 border-r-0"
                )}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(index)}
              >
                <DotFilledIcon
                  className={cn(
                    "w-8 h-8 hidden absolute",
                    isContrastDark(color) ? "text-gray-600" : "text-gray-200",
                    "group-hover:block"
                  )}
                />
                <DotFilledIcon
                  className={cn(
                    "w-8 h-8 hidden absolute",
                    isContrastDark(color) ? "text-black" : "text-white",
                    index === selectedColorIndex && "block"
                  )}
                />
              </div>
            ))}
          </div>
          <FormField
            control={form.control}
            name={`colors.${selectedColorIndex}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selected Color</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-6 gap-2">
                    <Input className="col-span-5" {...field} />
                    <ColorPicker
                      hex={form.watch(`colors.${selectedColorIndex}`)}
                      setHex={handleColorChange}
                      triggerButton={
                        <Button variant="outline" className="col-span-1">
                          <MixerHorizontalIcon />
                        </Button>
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name your palette..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="flex flex-grow gap-4">
            <Button
              className="w-full"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                form.reset();
                setSaveDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button className="w-full" type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

interface PaletteControlsProps {
  id?: string;
  name?: string;
  colors: string[];
  triggerButton: React.ReactNode;
}

export function SavePaletteDialog({
  id,
  name: prevName,
  colors,
  triggerButton,
}: PaletteControlsProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  return (
    <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <SavePaletteContent
        id={id}
        name={prevName}
        colors={colors}
        setSaveDialogOpen={setSaveDialogOpen}
      />
    </Dialog>
  );
}
