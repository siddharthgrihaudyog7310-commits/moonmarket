import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-px mx-auto flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl">🎈</p>
      <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">This balloon popped!</h1>
      <p className="mt-2 max-w-sm text-sm text-foreground/60">
        We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back to the party.
      </p>
      <Button asChild size="lg" className="mt-6">
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}
