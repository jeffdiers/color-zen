import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Define 24 color palettes
  const palettes = [
    {
      name: "Sunset Bliss",
      hexColors: ["#FF5733", "#FF8D1A", "#FFC300", "#FF5733", "#C70039"],
    },
    {
      name: "Ocean Breeze",
      hexColors: ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"],
    },
    {
      name: "Forest Walk",
      hexColors: ["#2E8B57", "#3CB371", "#66CDAA", "#8FBC8F", "#20B2AA"],
    },
    {
      name: "Candy Crush",
      hexColors: ["#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585"],
    },
    {
      name: "Lava Flow",
      hexColors: ["#FF4500", "#FF6347", "#FF7F50", "#FF8C00", "#FFA500"],
    },
    {
      name: "Ice Cream",
      hexColors: ["#D8BFD8", "#DDA0DD", "#EE82EE", "#DA70D6", "#FF00FF"],
    },
    {
      name: "Deep Sea",
      hexColors: ["#000080", "#0000CD", "#1E90FF", "#00BFFF", "#87CEEB"],
    },
    {
      name: "Morning Dew",
      hexColors: ["#F5FFFA", "#E0FFFF", "#AFEEEE", "#40E0D0", "#48D1CC"],
    },
    {
      name: "Autumn Leaves",
      hexColors: ["#8B0000", "#B22222", "#DC143C", "#FF6347", "#FF4500"],
    },
    {
      name: "Pastel Dreams",
      hexColors: ["#FFDAB9", "#E6E6FA", "#FFF0F5", "#F0FFF0", "#F5F5DC"],
    },
    {
      name: "Tropical Vibes",
      hexColors: ["#FF7F50", "#FF6347", "#FFD700", "#FFE4B5", "#8B0000"],
    },
    {
      name: "Neon Lights",
      hexColors: ["#39FF14", "#00FFFF", "#FF00FF", "#FFD700", "#FF4500"],
    },
    {
      name: "Vintage Vibe",
      hexColors: ["#D2B48C", "#8B4513", "#A0522D", "#CD853F", "#F4A460"],
    },
    {
      name: "Starry Night",
      hexColors: ["#191970", "#000080", "#00008B", "#0000CD", "#4169E1"],
    },
    {
      name: "Earthy Tones",
      hexColors: ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#F4A460"],
    },
    {
      name: "Bold and Bright",
      hexColors: ["#FF0000", "#FF7F50", "#FFFF00", "#7FFF00", "#00FF00"],
    },
    {
      name: "Cool Breeze",
      hexColors: ["#B0E0E6", "#ADD8E6", "#87CEEB", "#87CEFA", "#00BFFF"],
    },
    {
      name: "Mystic Woods",
      hexColors: ["#556B2F", "#6B8E23", "#8FBC8F", "#2E8B57", "#3CB371"],
    },
    {
      name: "Desert Sands",
      hexColors: ["#EDC9AF", "#F4A460", "#DEB887", "#D2B48C", "#BC8F8F"],
    },
    {
      name: "Sunshine",
      hexColors: ["#FFD700", "#FFFACD", "#FAFAD2", "#FFEFD5", "#FFE4B5"],
    },
    {
      name: "Berry Burst",
      hexColors: ["#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6"],
    },
    {
      name: "Minty Fresh",
      hexColors: ["#98FF98", "#32CD32", "#00FA9A", "#00FF7F", "#3CB371"],
    },
    {
      name: "Royal Elegance",
      hexColors: ["#800080", "#4B0082", "#8A2BE2", "#9370DB", "#BA55D3"],
    },
    {
      name: "Summer Fun",
      hexColors: ["#FF4500", "#FF6347", "#FFA07A", "#FFD700", "#FFFF00"],
    },
  ];

  // Seed the database with the defined palettes
  for (const palette of palettes) {
    await prisma.palette.create({
      data: palette,
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
