"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Recipe } from "@/types/recipe"
import { formatTime, getDifficulty, generateRecipeDescription } from "@/utils/recipeHelpers"
import Link from "next/link"

interface RecipeCardProps {
  recipe: Recipe
  onViewRecipe?: (recipe: Recipe) => void
}

export function RecipeCard({ recipe, onViewRecipe }: RecipeCardProps) {
  const handleViewRecipe = () => {
    onViewRecipe?.(recipe)
  }

  return (
    <Link href={`/recipe/${recipe.RecipeId}`} className="block h-full">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:cursor-pointer">
        {/* Recipe Image/Header */}
        <div className="relative h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f26950] to-[#e05840] flex items-center justify-center">
            <Image src={recipe.imageLink} alt={recipe.Name} fill className="object-cover" priority/>
            <div className="text-white text-center p-4">
              <h4 className="text-lg font-bold mb-2">{recipe.Name}</h4>
              <div className="text-sm opacity-90">
                <div>🍽️ {recipe.RecipeIngredientParts.length} ingredients</div>
                <div>📝 {recipe.RecipeInstructions.length} steps</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{recipe.Name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{generateRecipeDescription(recipe.RecipeIngredientParts)}</p>

          {/* Recipe Stats */}
          <div className="border-t border-b border-gray-100 py-4 mb-4">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(recipe.TotalTime)}</span>
              <span>{getDifficulty(recipe.TotalTime)}</span>
              <span>{Math.round(recipe.Calories)} CAL</span>
            </div>
          </div>

          {/* Nutrition Info */}
          <div className="mb-4 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Protein: {recipe.ProteinContent.toFixed(1)}g</span>
              <span>Carbs: {recipe.CarbohydrateContent.toFixed(1)}g</span>
              <span>Fat: {recipe.FatContent.toFixed(1)}g</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleViewRecipe}
            className="hover:bg-[#f26950] hover:text-white transition-colors duration-300"
          >
            VIEW RECIPE
          </Button>
        </div>
      </div>
    </Link>
  )
}

/* Other Recipecard option */
// "use client"

// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Star, ChefHat } from "lucide-react"
// import type { Recipe } from "@/types/recipe"

// interface RecipeCardProps {
//   recipe: Recipe
//   onViewRecipe: (recipe: Recipe) => void
// }

// export function RecipeCard({ recipe, onViewRecipe }: RecipeCardProps) {
//   return (
//     <Card className="p-4 h-full flex flex-col">
//       <div className="relative w-full h-48 mb-4">
//         <Image
//           src={recipe.imageLink}
//           alt={recipe.Name}
//           fill
//           className="object-cover rounded-md"
//           priority
//         />
//       </div>
//       <h3 className="text-lg font-semibold mb-2">{recipe.Name}</h3>
//       <div className="flex flex-wrap gap-2 mb-2">
//         {recipe.RecipeIngredientParts.slice(0, 3).map((ingredient, index) => (
//           <Badge key={index} variant="secondary">{ingredient}</Badge>
//         ))}
//       </div>
//       <div className="flex items-center gap-2 mb-2">
//         <Star className="h-5 w-5 text-yellow-400" />
//         <span>{recipe.Calories.toFixed(0)} Cal</span>
//       </div>
//       <div className="flex items-center gap-2 mb-4">
//         <Avatar>
//           <AvatarImage src="/chef-placeholder.jpg" alt="Chef" />
//           <AvatarFallback><ChefHat /></AvatarFallback>
//         </Avatar>
//         <span>{recipe.TotalTime}</span>
//       </div>
//       <Button onClick={() => onViewRecipe(recipe)} className="mt-auto">
//         View Recipe
//       </Button>
//     </Card>
//   )
// }
