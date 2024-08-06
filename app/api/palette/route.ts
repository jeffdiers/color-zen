import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Extract the search query from the request URL
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search") || "";

    // Fetch palettes from the database, filtered by the search query and ordered by createdAt
    const palettes = await prisma.palette.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive", // Case-insensitive search
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(palettes, { status: 200 });
  } catch (error) {
    console.error("Error fetching palettes:", error);
    return NextResponse.json(
      { error: "Error fetching palettes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, colors } = await request.json();

    // Save the palette to the database
    await prisma.palette.create({
      data: {
        name,
        hexColors: colors,
      },
    });

    return NextResponse.json(
      { message: "Palette saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving palette:", error);
    return NextResponse.json(
      { error: "Error saving palette" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    // Delete the palette from the database
    await prisma.palette.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Palette deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting palette:", error);
    return NextResponse.json(
      { error: "Error deleting palette" },
      { status: 500 }
    );
  }
}
