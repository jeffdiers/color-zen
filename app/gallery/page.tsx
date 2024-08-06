import { PaletteCard } from "@/components/palette-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import prisma from "@/lib/prisma";

export default async function MyPalettesPage() {
  const savedPalettes = await prisma.palette.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container relative min-h-[calc(100vh-3.5rem)]">
      <PageHeader>
        <PageHeaderHeading>Gallery</PageHeaderHeading>
        <PageHeaderDescription>
          A collection of saved color palettes.
        </PageHeaderDescription>
      </PageHeader>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedPalettes.map(({ id, name, hexColors }) => (
          <PaletteCard key={id} id={id} name={name} palette={hexColors} />
        ))}
      </section>
    </div>
  );
}
