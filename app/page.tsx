'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeaturedRecipesSlider } from "@/components/featured-recipes-slider"
import { RecipeCard } from "@/components/recipe-card"
import { useMightLike } from "@/hooks/useMightLike"
import { Recipe } from "@/types/recipe"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import bgImage from "@/public/assets/background.png"

export default function Home() {
  const { recipes, loading, error, refetch } = useMightLike()

  const handleViewRecipe = (recipe: Recipe) => {
    console.log("View recipe:", recipe.Name)
    // TODO: Implement recipe detail modal or navigation
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      {/* Hero Section */}
      <section className="relative h-[1000px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image src={bgImage || "/placeholder.svg"} alt="Cooking background" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">UNLEASH CULINARY EXCELLENCE</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Discover a world of flavors through our handcrafted recipes, and let the aroma of our passion for cooking
            fill your kitchen.
          </p>
          <Button className="bg-[#f26950] hover:bg-[#e05840] text-white">EXPLORE RECIPES</Button>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">FEATURED RECIPES</h2>
          </div>
          <FeaturedRecipesSlider />
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Might you like</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            With our diverse collection of recipes, we have something to satisfy every craving and occasion.
          </p>

          {/* <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-[#f26950] hover:bg-[#e05840]" : ""}
              >
                {category}
              </Button>
            ))}
          </div> */}
          {loading ? (<LoadingSpinner message="Loading featured recipes..." />): ("")}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add Recipe card */}
            {recipes.map((recipe, index) => (
            // <div key={`${recipe.Name}-${index}`} className="flex-shrink-0 p-2" style={{ flex: `0 0 ${100 / visibleSlides}%` }}>
              <RecipeCard recipe={recipe} onViewRecipe={handleViewRecipe} />
            // </div>
          ))}
          </div>
        </div>
      </section>

      {/* Culinary Chronicle */}
      {/* <section className="py-16 bg-[#f9f5f0]">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="bg-[#f26950] text-white inline-block px-3 py-1 rounded-full text-sm mb-4">BLOG</div>
            <h2 className="text-3xl font-bold mb-4">OUR CULINARY CHRONICLE</h2>
            <p className="text-gray-700 max-w-3xl">
              Our journey is crafted with dedication, creativity, and passion for food. Through our blog, we share
              culinary explorations, tips, and inspiring the amateur chefs among our readers.
            </p>
            <Button variant="link" className="text-[#f26950] p-0 mt-2">
              READ MORE
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt={`Food ${index}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter */}
      <section className="py-16 bg-[#f26950]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">JOIN THE FUN</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">SUBSCRIBE NOW!</h3>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for a weekly serving of recipes, cooking tips, and exclusive insights straight
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Email Address..." className="bg-white text-gray-800" />
            <Button className="bg-gray-900 hover:bg-gray-800">SUBSCRIBE</Button>
          </div>
        </div>
      </section>
    </div>
  )
}