"use client";

import { useEffect } from "react";
import { Button } from "@/components/molecules/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-xxxl font-bold text-primary mb-4">Oops!</h1>
      <h2 className="text-xl font-semibold text-secondary mb-6">
        Something went wrong
      </h2>
      <p className="text-secondary mb-8 max-w-md">
        We apologize for the inconvenience. Please try again or contact support
        if the problem persists.
      </p>
      <div className="flex gap-4 w-[80%]">
        <Button variant="primary" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Return to catalog
        </Button>
      </div>
    </div>
  );
}
