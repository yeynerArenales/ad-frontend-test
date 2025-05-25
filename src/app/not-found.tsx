import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-xxxl font-bold text-primary mb-4">404</h1>
      <h2 className="text-xl font-semibold text-secondary mb-6">
        Page Not Found
      </h2>
      <p className="text-secondary mb-8 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="text-secondary hover:text-tertiary">
        Return to catalog
      </Link>
    </div>
  );
}
