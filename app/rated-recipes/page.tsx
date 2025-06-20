"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { Star, Trash2 } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"
import { formatTime, getDifficulty } from "@/utils/recipeHelpers"
import axios from "axios"
import { useState, useEffect } from "react"

export default function FavoritesPage() {
   const { favorites: initialFavorites, loading, error } = useFavorites()
  const [favorites, setFavorites] = useState(initialFavorites)
  useEffect(() => {
    setFavorites(initialFavorites)
  }, [initialFavorites])

  const handleRemove = async (recipe_id: string) => {

    try {
      const user_id = localStorage.getItem("user_id")
      
      const response = await axios.post(
        "http://localhost:8080/remove-rated",
        {
          user_id,
          recipe_id
        }
      )
      if (response.data.message) {
        setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.recipe_id !== recipe_id))
      }
      alert(response.data.message) // Replace with toast notification in production
    } catch (err: any) {
      console.error("Failed to submit rating:", err)
      const errorMessage = err.response?.data?.detail || "Failed to remove rating. Please try again."
    } finally {
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f5f0] py-16">
        <div className="container mx-auto px-4">
          <LoadingSpinner message="Loading your favorite recipes..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f5f0] py-16">
        <div className="container mx-auto px-4">
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Favorite Recipes</h1>
        {favorites.length === 0 ? (
          <p className="text-gray-700">You haven't rated any recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(
              (favorite) =>
                favorite.recipe && (
                  <div key={favorite.recipe_id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white/90 text-red-600 hover:text-red-700"
                      onClick={() => handleRemove(favorite.recipe_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <img
                      src={favorite.recipe.imageLink || "/placeholder.svg"}
                      alt={favorite.recipe.Name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <Link href={`/recipe/${favorite.recipe_id}`} passHref>
                        <h2 className="text-xl font-bold mb-2 hover:text-[#f26950] cursor-pointer">
                          {favorite.recipe.Name}
                        </h2>
                      </Link>
                      <div className="flex items-center mb-2">
                        {Array(favorite.rating)
                          .fill(0)
                          .map((_, index) => (
                            <Star key={index} className="h-5 w-5 text-[#f26950] fill-[#f26950]" />
                          ))}
                        <span className="ml-2 text-gray-700">
                          {favorite.rating} {favorite.rating === 1 ? "star" : "stars"}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{favorite.review}</p>
                      <p className="text-gray-500 text-sm mb-2">
                        Rated on: {new Date(favorite.date).toLocaleDateString()}
                      </p>
                      <div className="flex flex-wrap gap-4 text-gray-700 mb-4">
                        <div className="flex items-center">
                          <span>Total Time: {formatTime(favorite.recipe.TotalTime)}</span>
                        </div>
                        <div className="flex items-center">
                          <span>Difficulty: {getDifficulty(favorite.recipe.TotalTime)}</span>
                        </div>
                        <div className="flex items-center">
                          <span>Calories: {Math.round(favorite.recipe.Calories)}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                        onClick={() => handleRemove(favorite.recipe_id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove from Favorites
                      </Button>
                    </div>
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
