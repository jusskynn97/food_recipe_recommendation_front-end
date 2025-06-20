"use client"

import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  message: string
  onRefresh?: () => void
}

export function EmptyState({ message, onRefresh }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-500 mb-4">{message}</div>
      {onRefresh && (
        <Button onClick={onRefresh} className="bg-[#f26950] hover:bg-[#e05840]">
          Refresh
        </Button>
      )}
    </div>
  )
}
