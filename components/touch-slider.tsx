"use client"

import type React from "react"

import { useRef } from "react"

interface TouchSliderProps {
  children: React.ReactNode
  onSwipeLeft: () => void
  onSwipeRight: () => void
  className?: string
}

export function TouchSlider({ children, onSwipeLeft, onSwipeRight, className }: TouchSliderProps) {
  const touchStartRef = useRef(0)
  const touchEndRef = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const touchStart = touchStartRef.current
    const touchEnd = touchEndRef.current

    if (touchStart - touchEnd > 100) {
      onSwipeLeft()
    }

    if (touchStart - touchEnd < -100) {
      onSwipeRight()
    }
  }

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}
