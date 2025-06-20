"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { formatTime, getDifficulty } from "@/utils/recipeHelpers"
import { ArrowLeft, Clock, ChefHat, Printer, Share2, Star } from "lucide-react"
import { useRecipe } from "@/hooks/useRecipe"
import { RecipeCard } from "@/components/recipe-card"
import { useState, useEffect } from "react"
import axios from "axios"
import type { Recipe } from "@/types/recipe"

interface InteractionResponse {
  message: string
  interaction: {
    recipe_id: string
    user_id: string
    date: string
    rating: number
    review: string
    recipe: any // Adjust based on your Recipe type
  }
}

interface SimilarRecipesResponse {
  similar_recipes: Recipe[]
}

export default function RecipeDetailPage() {
  const { id } = useParams() as { id: string }
  const { recipe, loading, error } = useRecipe(id)
  const [rating, setRating] = useState<number>(0)
  const [review, setReview] = useState<string>("")
  const [rated, setRated] = useState<boolean>(false)
  const [submittedData, setSubmittedData] = useState<{ rating: number; review: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Similar recipes state
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([])
  const [similarRecipesLoading, setSimilarRecipesLoading] = useState<boolean>(false)
  const [similarRecipesError, setSimilarRecipesError] = useState<string | null>(null)

  const router = useRouter()

  // Fetch similar recipes when recipe is loaded
  useEffect(() => {
    if (recipe?.RecipeId) {
      fetchSimilarRecipes(recipe.RecipeId)
    }
  }, [recipe])

  const fetchSimilarRecipes = async (recipeId: string) => {
    setSimilarRecipesLoading(true)
    setSimilarRecipesError(null)

    try {
      const response = await axios.post(
        "http://localhost:8080/similar-recipes",
        {
          recipe_id: recipeId,
        }
      )
      console.log(response.data)

      setSimilarRecipes(response.data.output || [])
      console.log(similarRecipes)
    } catch (err: any) {
      console.error("Failed to fetch similar recipes:", err)
      setSimilarRecipesError("Failed to load similar recipes")
    } finally {
      setSimilarRecipesLoading(false)
    }
  }


  const handleRating = (value: number) => {
    setRating(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating < 1 || rating > 5 || !review.trim()) {
      setSubmitError("Please provide a rating (1-5) and a review.")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const user_id = localStorage.getItem("user_id")
      const token = localStorage.getItem("id_token")
      if (!user_id || !token) {
        setSubmitError("Please log in to rate recipes.")
        router.push("/login") // Adjust to your login route
        return
      }

      // Format date as MM-DD-YYYY HH:MM:SS
      const date = new Date()
        .toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/,/, "")
        .replace(/(\d+)\/(\d+)\/(\d+) (\d+:\d+:\d+)/, "$1-$2-$3 $4")

      const response = await axios.post<InteractionResponse>(
        "http://localhost:8080/add-rated",
        {
          user_id,
          recipe_id: id,
          rating,
          review,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      setRated(true)
      alert(response.data.message) // Replace with toast notification in production
    } catch (err: any) {
      console.error("Failed to submit rating:", err)
      const errorMessage = err.response?.data?.detail || "Failed to submit rating. Please try again."
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f5f0] py-16">
        <div className="container mx-auto px-4">
          <LoadingSpinner message="Loading recipe details..." />
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-[#f9f5f0] py-16">
        <div className="container mx-auto px-4">
          <ErrorState message={error || "Recipe not found"} onRetry={() => (window.location.href = "/")} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      {/* Recipe Header */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={recipe.imageLink || "/placeholder.svg"}
          alt={recipe.Name}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4">
          <Link href="/" passHref>
            <Button variant="outline" size="sm" className="bg-white/90 mb-6 w-fit">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to recipes
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{recipe.Name}</h1>
          <div className="flex flex-wrap gap-4 text-white/90">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Total Time: {formatTime(recipe.TotalTime)}</span>
            </div>
            <div className="flex items-center">
              <ChefHat className="h-5 w-5 mr-2" />
              <span>Difficulty: {getDifficulty(recipe.TotalTime)}</span>
            </div>
            <div className="flex items-center">
              <span>Calories: {Math.round(recipe.Calories)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Recipe Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About This Recipe</h2>
              <p className="text-gray-700">
                This delicious {recipe.Name.toLowerCase()} recipe is perfect for any occasion. With{" "}
                {recipe.RecipeIngredientParts.length} ingredients and {recipe.RecipeInstructions.length} simple steps,
                you'll be enjoying this meal in {formatTime(recipe.TotalTime)}.
              </p>
            </div>

            {/* Ingredients */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.RecipeIngredientParts.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-[#f26950] mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-6">
                {recipe.RecipeInstructions.map((step, index) => (
                  <li key={index} className="flex">
                    <div className="w-8 h-8 rounded-full bg-[#f26950] text-white flex items-center justify-center mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Nutrition Facts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Nutrition Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Calories</span>
                  <span className="font-medium">{Math.round(recipe.Calories)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Fat</span>
                  <span className="font-medium">{recipe.FatContent.toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturated Fat</span>
                  <span className="font-medium">{recipe.SaturatedFatContent.toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Carbohydrates</span>
                  <span className="font-medium">{recipe.CarbohydrateContent.toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Fiber</span>
                  <span className="font-medium">{recipe.FiberContent.toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sugar</span>
                  <span className="font-medium">{recipe.SugarContent.toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Protein</span>
                  <span className="font-medium">{recipe.ProteinContent.toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sodium</span>
                  <span className="font-medium">{recipe.SodiumContent.toFixed(1)}mg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cholesterol</span>
                  <span className="font-medium">{recipe.CholesterolContent.toFixed(1)}mg</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button className="w-full bg-[#f26950] hover:bg-[#e05840]">
                <Printer className="h-4 w-4 mr-2" /> Print Recipe
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" /> Share Recipe
              </Button>
            </div>

            {/* Rating and Review Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Rate and Review</h3>
              {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-4">
                  <span className="mr-3 text-gray-700">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${rating >= star ? "text-[#f26950] fill-[#f26950]" : "text-gray-400"}`}
                      onClick={() => handleRating(star)}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26950] text-gray-700"
                  rows={4}
                  placeholder="Write your review here..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#f26950] hover:bg-[#e05840] mt-3"
                  disabled={rated || !review.trim() || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Rating & Review"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Similar Recipes Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Similar Recipes</h2>
            <p className="text-gray-600">You might also enjoy these delicious recipes</p>
          </div>

          {similarRecipesLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner message="Loading similar recipes..." />
            </div>
          ) : similarRecipesError ? (
            <div className="text-center py-12">
              <ErrorState
                message={similarRecipesError}
                onRetry={() => recipe?.RecipeId && fetchSimilarRecipes(recipe.RecipeId)}
              />
            </div>
          ) : similarRecipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarRecipes.map((similarRecipe) => (
                  <RecipeCard key={similarRecipe.RecipeId} recipe={similarRecipe} />
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/recipes">
                  <Button variant="outline" className="px-8">
                    View All Recipes
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No similar recipes found at the moment.</p>
              <Link href="/recipes">
                <Button variant="outline" className="px-8">
                  Browse All Recipes
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
