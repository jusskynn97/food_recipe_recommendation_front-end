export const formatTime = (minutes: string): string => {
  const mins = Number.parseInt(minutes)
  if (mins >= 60) {
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return remainingMins > 0 ? `${hours}H ${remainingMins}M` : `${hours}H`
  }
  return `${mins}M`
}

export const getDifficulty = (totalTime: string): string => {
  const mins = Number.parseInt(totalTime)
  if (mins <= 30) return "EASY PREP"
  if (mins <= 60) return "MEDIUM PREP"
  return "HARD PREP"
}

export const generateRecipeDescription = (ingredients: string[]): string => {
  const mainIngredients = ingredients.slice(0, 3).join(", ")
  const additionalCount = ingredients.length - 3

  return `A delicious recipe featuring ${mainIngredients}${
    additionalCount > 0 ? ` and ${additionalCount} more ingredients` : ""
  }.`
}
