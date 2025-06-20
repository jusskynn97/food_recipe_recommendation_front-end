"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SliderControlsProps {
  onPrevious: () => void
  onNext: () => void
  currentSlide: number
  totalSlides: number
  onGoToSlide: (index: number) => void
  isAutoPlaying: boolean
  onToggleAutoPlay: () => void
}

export function SliderControls({
  onPrevious,
  onNext,
  currentSlide,
  totalSlides,
  onGoToSlide,
  isAutoPlaying,
  onToggleAutoPlay,
}: SliderControlsProps) {
  return (
    <>
      {/* Navigation Arrows */}
      <button
        onClick={onPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-r-full p-3 shadow-md transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-[#f26950]" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-l-full p-3 shadow-md transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-[#f26950]" />
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-3 mt-8">
        {Array.from({ length: totalSlides}).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-[#f26950] w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      {/* <div className="flex justify-center mt-4">
        <Button variant="ghost" size="sm" onClick={onToggleAutoPlay} className="text-gray-500 hover:text-[#f26950]">
          {isAutoPlaying ? "Pause Slideshow" : "Play Slideshow"}
        </Button>
      </div> */}
    </>
  )
}
