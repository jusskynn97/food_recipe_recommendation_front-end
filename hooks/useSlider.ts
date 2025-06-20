"use client"

import { useState, useEffect, useCallback } from "react"

interface UseSliderProps {
  itemCount: number
  autoPlayInterval?: number
}

export function useSlider({ itemCount, autoPlayInterval = 3000 }: UseSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(itemCount) // Start at first real slide (after clones)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const clonesPerSide = itemCount > 0 ? Math.min(itemCount, 3) : 0 // Clone up to 3 items per side
  const totalSlides = itemCount > 0 ? itemCount + clonesPerSide * 2 : 0 // Total slides including clones

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev >= itemCount + clonesPerSide - 1) {
        return clonesPerSide // Jump to first real slide
      }
      return prev + 1
    })
  }, [itemCount, clonesPerSide])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev <= clonesPerSide) {
        return itemCount + clonesPerSide - 1 // Jump to last real slide
      }
      return prev - 1
    })
  }, [itemCount, clonesPerSide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index + clonesPerSide) // Adjust for clones
  }

  // Handle transition for infinite loop
  const handleTransitionEnd = useCallback(() => {
    if (currentSlide >= itemCount + clonesPerSide) {
      setCurrentSlide(clonesPerSide)
    } else if (currentSlide < clonesPerSide) {
      setCurrentSlide(itemCount + clonesPerSide - 1)
    }
  }, [currentSlide, itemCount, clonesPerSide])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || itemCount === 0) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, itemCount, autoPlayInterval, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    isAutoPlaying,
    setIsAutoPlaying,
    totalSlides,
    clonesPerSide,
    handleTransitionEnd,
  }
}