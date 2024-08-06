import { createContext, useContext, useState, ReactNode } from "react";

type PaletteContextType = {
  colors: string[] | null;
  name: string;
  lockedColors: boolean[];
  setColors: (colors: string[]) => void;
  setName: (name: string) => void;
  toggleColorLock: (index: number) => void;
  randomizeColors: () => void;
};

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const randomPalette = (length: number) => {
  return Array(length)
    .fill("")
    .map(() => {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      );
    });
};

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<string[] | null>(null);
  const [name, setName] = useState<string>("");
  const [lockedColors, setLockedColors] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const randomizeColors = () => {
    setColors((prevColors) => {
      if (!prevColors) return randomPalette(5);
      return prevColors.map((color, index) =>
        lockedColors[index] ? color : randomPalette(1)[0]
      );
    });
  };

  const toggleColorLock = (index: number) => {
    setLockedColors((prevLockedColors) => {
      const newLockedColors = [...prevLockedColors];
      newLockedColors[index] = !newLockedColors[index];
      return newLockedColors;
    });
  };

  return (
    <PaletteContext.Provider
      value={{
        colors,
        name,
        lockedColors,
        setColors,
        setName,
        toggleColorLock,
        randomizeColors,
      }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
}
