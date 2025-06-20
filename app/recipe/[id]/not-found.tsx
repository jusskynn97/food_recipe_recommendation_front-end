import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold mb-4">Recipe Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the recipe you're looking for. It might have been removed or doesn't exist.
        </p>
        <Link href="/">
          <Button className="bg-[#f26950] hover:bg-[#e05840]">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
