"use client"

import { useState, useEffect } from "react"
import type { Recipe, ApiResponse } from "@/types/recipe"

const API_URL = "http://localhost:8080/popular"

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      setRecipes(data.output || [])
    } catch (err) {
      console.error("Error fetching recipes:", err)
      setError("Failed to load recipes. Please try again later.")
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return { recipes, loading, error, refetch: fetchRecipes }
}
