export interface Recipe {
  RecipeId: string
  Name: string
  CookTime: string
  PrepTime: string
  TotalTime: string
  RecipeIngredientParts: string[]
  Calories: number
  FatContent: number
  SaturatedFatContent: number
  CholesterolContent: number
  SodiumContent: number
  CarbohydrateContent: number
  FiberContent: number
  SugarContent: number
  ProteinContent: number
  RecipeInstructions: string[]
  imageLink: string
}

export interface ApiResponse {
  output: Recipe[]
}
