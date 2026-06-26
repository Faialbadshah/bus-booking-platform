import { ReviewSession } from "@/components/review/ReviewSession";

export default function ReviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Review</h1>
        <p className="text-zinc-400 text-sm mt-1">Work through today&apos;s due cards.</p>
      </div>
      <ReviewSession />
    </div>
  );
}
