import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[#f9f5f0] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Test Page</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This is a test page for development and testing purposes. You can use this page to test new features,
              components, or functionality.
            </p>
          </div>

          {/* Test Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* API Test Card */}
            <Card>
              <CardHeader>
                <CardTitle>API Testing</CardTitle>
                <CardDescription>Test the recipe API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-[#f26950] hover:bg-[#e05840]">Test Popular Recipes</Button>
                  <Button variant="outline" className="w-full">
                    Test Search API
                  </Button>
                  <Button variant="outline" className="w-full">
                    Test Categories
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Component Test Card */}
            <Card>
              <CardHeader>
                <CardTitle>Component Testing</CardTitle>
                <CardDescription>Test individual components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Test Recipe Card
                  </Button>
                  <Button variant="outline" className="w-full">
                    Test Slider
                  </Button>
                  <Button variant="outline" className="w-full">
                    Test Modal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feature Test Card */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Testing</CardTitle>
                <CardDescription>Test new features and functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Test Search
                  </Button>
                  <Button variant="outline" className="w-full">
                    Test Filters
                  </Button>
                  <Button variant="outline" className="w-full">
                    Test Favorites
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Data Display */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Test Data</CardTitle>
              <CardDescription>Sample data for testing purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Sample Recipe Data:</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(
                      {
                        Name: "Test Recipe",
                        CookTime: "30",
                        PrepTime: "15",
                        TotalTime: "45",
                        Calories: 350,
                        RecipeIngredientParts: ["ingredient1", "ingredient2", "ingredient3"],
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">API Endpoints:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-gray-100 p-2 rounded">
                      <code>GET /popular</code> - Get popular recipes
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <code>GET /search?q=query</code> - Search recipes
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <code>GET /categories</code> - Get recipe categories
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="text-center">
            <Link href="/">
              <Button variant="outline" className="mr-4">
                ← Back to Home
              </Button>
            </Link>
            <Button className="bg-[#f26950] hover:bg-[#e05840]">Run All Tests</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
