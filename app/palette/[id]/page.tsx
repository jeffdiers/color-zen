import { DeleteDialog } from "@/components/delete-confirm-dialog";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SavePaletteDialog } from "@/components/save-palette-dialog";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { MagicWandIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PalettePage({
  params,
}: {
  params: { id: string };
}) {
  const palette = await prisma.palette.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!palette) {
    redirect("/gallery");
  }

  return (
    <div className="container flex flex-col min-h-[calc(100vh-3.5rem)]">
      <PageHeader>
        <PageHeaderHeading className="capitalize">
          {palette.name}
        </PageHeaderHeading>
        <PageHeaderDescription>
          You can create a new palette using these colors, or make changes to
          this one.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant="ghost" size="sm">
            <Link href={"/create/" + palette.id}>
              <MagicWandIcon className="w-5 h-5 mr-2" />
              Create
            </Link>
          </Button>
          <SavePaletteDialog
            id={palette.id}
            name={palette.name}
            colors={palette.hexColors}
            triggerButton={
              <Button variant="ghost" size="sm">
                <Pencil2Icon className="w-5 h-5 mr-2" />
                Edit
              </Button>
            }
          />
          <DeleteDialog
            id={palette.id}
            triggerButton={
              <Button variant="ghost" size="sm">
                <TrashIcon className="w-5 h-5 mr-2 text-destructive" />
                Delete
              </Button>
            }
          />
        </PageActions>
      </PageHeader>
      <section className="flex-grow h-full flex flex-col sm:flex-row gap-0 pb-0 sm:pb-24">
        {palette.hexColors.map((color, index) => (
          <div
            key={color}
            className={cn(
              "w-full h-28 sm:h-auto bg-gray-200 border",
              index === 0
                ? "rounded-t-xl sm:rounded-tr-none sm:rounded-bl-xl"
                : "border-t-0 sm:border-l-0 sm:border-t",
              index === palette.hexColors.length - 1
                ? "rounded-b-xl sm:rounded-bl-none sm:rounded-tr-xl"
                : "border-b-0 sm:border-r-0 sm:border-b"
            )}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </section>
    </div>
  );
}
