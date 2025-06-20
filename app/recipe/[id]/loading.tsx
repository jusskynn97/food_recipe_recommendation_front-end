import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f5f0] py-16">
      <div className="container mx-auto px-4">
        <LoadingSpinner message="Loading recipe details..." />
      </div>
    </div>
  )
}
