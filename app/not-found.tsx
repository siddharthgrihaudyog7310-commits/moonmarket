import { LinkButton } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-5xl" aria-hidden="true">☾</p>
      <h1 className="font-poppins font-extrabold text-3xl text-ink">Page Not Found</h1>
      <p className="text-ink/70 max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <LinkButton href="/">Back to Home</LinkButton>
    </div>
  );
}
