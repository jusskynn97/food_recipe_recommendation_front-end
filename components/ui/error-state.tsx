"use client"

import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-red-500 mb-4">{message}</div>
      {onRetry && (
        <Button onClick={onRetry} className="bg-[#f26950] hover:bg-[#e05840]">
          Try Again
        </Button>
      )}
    </div>
  )
}
