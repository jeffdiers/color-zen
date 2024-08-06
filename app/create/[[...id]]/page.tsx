import { PaletteGenerator } from "@/components/palette-generator";
import prisma from "@/lib/prisma";

export default async function CreatePage({
  params,
}: {
  params: { id: string[] };
}) {
  const palette =
    params?.id?.length > 0
      ? await prisma.palette.findUnique({
          where: {
            id: params.id[0],
          },
        })
      : null;

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <PaletteGenerator presetColors={palette?.hexColors} />
    </section>
  );
}
