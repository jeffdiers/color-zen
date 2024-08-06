"use client";

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
import { deletePalette } from "@/lib/actions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DeleteConfirmDialogProps {
  id: string;
  setDialogOpen: (open: boolean) => void;
  stayOnPage?: boolean;
}

export function DeleteDialogContent({
  id,
  setDialogOpen,
}: DeleteConfirmDialogProps) {
  const { toast } = useToast();

  const handleAction = () => {
    deletePalette(id);
    setDialogOpen?.(false);
    toast({
      title: "Palette Deleted",
      description: "The palette has been successfully deleted.",
    });
  };

  return (
    <DialogContent className="sm:max-w-[420px]">
      <DialogHeader>
        <DialogTitle>Delete Palette</DialogTitle>
        <DialogDescription>
          Do you really want to delete this palette?
        </DialogDescription>
      </DialogHeader>
      <form action={handleAction}>
        <DialogFooter className="flex flex-grow gap-4">
          <Button
            className="w-full"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button className="w-full" variant="destructive" type="submit">
            Delete
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export function DeleteDialog({
  id,
  triggerButton,
}: {
  id: string;
  triggerButton: React.ReactNode;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DeleteDialogContent id={id} setDialogOpen={setDialogOpen} />
    </Dialog>
  );
}
