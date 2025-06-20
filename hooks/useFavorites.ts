"use client"

import { useState, useEffect } from "react"
import type { InteractionOut } from "@/types/interaction"
import axios from "axios"

export function useFavorites() {
  const [favorites, setFavorites] = useState<InteractionOut[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('id_token') // Assuming token is stored in localStorage
        const user_id = localStorage.getItem('user_id')
        if (!token) {
          throw new Error("Please log in to view favorites.")
        }

        const response = await axios.post("http://localhost:8080/favorites", {
          user_id
        })

        setFavorites(response.data.output || [])
      } catch (err: any) {
        console.error("Error fetching favorites:", err)
        setError(err.response?.data?.detail || "Failed to load favorites. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  return { favorites, loading, error }
}