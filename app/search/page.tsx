"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { RecipeCard } from "@/components/recipe-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAccount } from "@/hooks/useAccount"
import { Recipe } from "@/types/recipe"

interface SearchResponse {
  output: Recipe[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { user } = useAccount()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setError("No valid search query provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.post(
          "http://localhost:8080/search-recipes",
          {
            user_id: localStorage.getItem("user_id"),
            query: decodeURIComponent(query),
            n_results: 20,
          }
        )
        setRecipes(response.data.output || [])
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch search results")
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, user])

  return (
    <div className="min-h-screen bg-[#f9f5f0] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Search Results for: {decodeURIComponent(query)}
        </h1>

        {loading ? (
          <LoadingSpinner message="Loading search results..." />
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-gray-700 text-center">No recipes found. Try different ingredients or hobbies.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.RecipeId} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}