import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <Icons.spinner className="animate-spin h-12 w-12 text-primary" />
    </div>
  );
}
