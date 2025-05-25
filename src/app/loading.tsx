import { Loader } from "@/components/atoms/loader";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="large" />
    </div>
  );
}