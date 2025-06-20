import { Recipe } from "./recipe"

export interface InteractionOut {
  recipe_id: string
  user_id: string
  date: string
  rating: number
  review: string
  recipe: Recipe | null
}