"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { hexToRgb, rgbToHex } from "@/lib/utils";

interface ColorPickerProps {
  hex: string;
  setHex: (hex: string) => void;
  triggerButton: React.ReactNode;
}

export function ColorPicker({ hex, setHex, triggerButton }: ColorPickerProps) {
  const [R, G, B] = hexToRgb(hex);

  const setRed = (value: number) => setHex(rgbToHex([value, G, B]));
  const setGreen = (value: number) => setHex(rgbToHex([R, value, B]));
  const setBlue = (value: number) => setHex(rgbToHex([R, G, value]));

  return (
    <Popover>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent
        className="w-72"
        onOpenAutoFocus={(e) => e.preventDefault()} // disable autofocus
      >
        <div className="grid gap-4 pb-4">
          <div className="flex flex-col items-center gap-4">
            <Setter
              name="red"
              value={R}
              setValue={setRed}
              gradient={`rgb(0, ${G}, ${B}), rgb(255, ${G}, ${B})`}
            />
            <Setter
              name="green"
              value={G}
              setValue={setGreen}
              gradient={`rgb(${R}, 0, ${B}), rgb(${R}, 255, ${B})`}
            />
            <Setter
              name="blue"
              value={B}
              setValue={setBlue}
              gradient={`rgb(${R}, ${G}, 0), rgb(${R}, ${G}, 255)`}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface SetterProps {
  name: string;
  value: number;
  setValue: (value: number) => void;
  gradient: string;
}

function Setter({ name, value, setValue, gradient }: SetterProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <Label htmlFor={name} className="capitalize">
          {name}
        </Label>
        <Input
          id={name}
          type="number"
          min={0}
          max={255}
          value={value}
          onChange={(e: { target: { value: string } }) =>
            setValue(parseInt(e.target.value))
          }
          className="w-18 h-6 p-1"
        />
      </div>
      <Slider
        id={name}
        value={[value]}
        onValueChange={(value) => setValue(value[0])}
        max={255}
        step={1}
        gradient={gradient}
      />
    </div>
  );
}
