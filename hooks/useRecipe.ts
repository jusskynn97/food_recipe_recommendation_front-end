"use client"

import { useState, useEffect } from "react"
import type { Recipe } from "@/types/recipe"

const API_URL = "http://localhost:8080/recipe"

export function useRecipe(id: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (!data.recipe) {
          throw new Error("Recipe not found")
        }

        setRecipe({
          ...data.recipe,
          id: id,
        })
      } catch (err) {
        console.error("Error fetching recipe:", err)
        setError("Failed to load recipe. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRecipe()
    }
  }, [id])

  return { recipe, loading, error }
}