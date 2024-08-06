import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to convert a hex to an RGB value
export function hexToRgb(hex: string) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// Function to convert an RGB value to a hex
export function rgbToHex([r, g, b]: number[]) {
  return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, "0")}`;
}

// Function to get the contrast text color based on the background color
export function isContrastDarkRGB([r, g, b]: number[]): boolean {
  // Normalize the RGB values to a 0-1 scale
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  // Calculate the luminance
  const luminance =
    0.299 * normalizedR + 0.587 * normalizedG + 0.114 * normalizedB;

  // Use white text for dark backgrounds and black text for light backgrounds
  return luminance > 0.5;
}

// Function to get the contrast text color based on the background color
export function isContrastDark(hex: string): boolean {
  return isContrastDarkRGB(hexToRgb(hex));
}
