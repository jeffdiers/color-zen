import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] pb-24">
      <PageHeader className="w-full items-center text-center gap-8 md:gap-20">
        <PageHeaderHeading className="text-4xl md:text-6xl pt-0">
          Welcome to Color Palettes
        </PageHeaderHeading>
        <PageHeaderDescription className="text-lg md:text-xl">
          Generate and save beautiful color palettes. Get started by creating a
          new palette or browsing existing ones.
        </PageHeaderDescription>
        <PageActions className="flex items-center justify-center">
          <Button asChild>
            <Link href="/create">Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/gallery">Browse Palettes</Link>
          </Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
