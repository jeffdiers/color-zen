"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function createOrUpdatePalette(
  id: string | undefined,
  name: string,
  colors: string[]
) {
  if (id) {
    // Update existing palette
    await prisma.palette.update({
      where: { id },
      data: {
        name,
        hexColors: colors,
      },
    });
  } else {
    // Create new palette
    await prisma.palette.create({
      data: {
        name,
        hexColors: colors,
      },
    });
  }

  revalidatePath("/gallery");
}

export async function deletePalette(id: string) {
  await prisma.palette.delete({
    where: { id },
  });
  revalidatePath("/palette/" + id);
  revalidatePath("/gallery");
}
