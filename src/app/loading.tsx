import { Spinner } from "@/components/atoms/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="large" />
    </div>
  );
}