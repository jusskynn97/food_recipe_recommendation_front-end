"use client"

import { useWindowSize } from "@/hooks/useWindowSize"
import { useRecipes } from "@/hooks/useRecipes"
import { useSlider } from "@/hooks/useSlider"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"
import { RecipeCard } from "@/components/recipe-card"
import { SliderControls } from "@/components/slider-controls"
import { TouchSlider } from "@/components/touch-slider"
import type { Recipe } from "@/types/recipe"

export function FeaturedRecipesSlider() {
  const { recipes, loading, error, refetch } = useRecipes()
  const windowSize = useWindowSize()
  const { 
    currentSlide, 
    nextSlide, 
    prevSlide, 
    goToSlide, 
    isAutoPlaying, 
    setIsAutoPlaying, 
    totalSlides, 
    clonesPerSide,
    handleTransitionEnd 
  } = useSlider({
    itemCount: recipes.length,
    autoPlayInterval: 3000,
  })

  const getVisibleSlides = () => {
    const width = windowSize.width
    if (width >= 1280) return 3
    if (width >= 768) return 2
    return 1
  }

  const handleViewRecipe = (recipe: Recipe) => {
    console.log("View recipe:", recipe.Name)
    // TODO: Implement recipe detail modal or navigation
  }

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)
  const handleToggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying)

  if (loading) {
    return <LoadingSpinner message="Loading featured recipes..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />
  }

  if (recipes.length === 0) {
    return <EmptyState message="No featured recipes available at the moment." onRefresh={refetch} />
  }

  const visibleSlides = getVisibleSlides()

  // Create array with cloned slides
  const clonedRecipes = [
    ...recipes.slice(-clonesPerSide), // Clone last items at start
    ...recipes,
    ...recipes.slice(0, clonesPerSide), // Clone first items at end
  ]

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <TouchSlider onSwipeLeft={nextSlide} onSwipeRight={prevSlide} className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${(currentSlide * 100) / visibleSlides}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedRecipes.map((recipe, index) => (
            <div key={`${recipe.Name}-${index}`} className="flex-shrink-0 p-2" style={{ flex: `0 0 ${100 / visibleSlides}%` }}>
              <RecipeCard recipe={recipe} onViewRecipe={handleViewRecipe} />
            </div>
          ))}
        </div>
      </TouchSlider>
      <SliderControls
        onPrevious={prevSlide}
        onNext={nextSlide}
        currentSlide={currentSlide - clonesPerSide} // Adjust for display
        totalSlides={recipes.length}
        onGoToSlide={goToSlide}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={handleToggleAutoPlay}
      />
    </div>
  )
}