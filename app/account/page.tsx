"use client"
import { useAccount } from "@/hooks/useAccount"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, MapPin, Edit3, Save, X, Heart, ChefHat, Star } from "lucide-react"
import Link from "next/link"

export default function Profile() {
  const { user, router } = useAccount()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState({
    displayName: user?.displayName || "",
    bio: "Passionate home cook who loves experimenting with flavors and sharing delicious recipes with friends and family.",
    location: "New York, NY",
    favoriteRecipes: 24,
    recipesCreated: 8,
    averageRating: 4.7,
  })

  const [editData, setEditData] = useState(profile)

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProfile(editData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData(profile)
  }

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <p className="text-gray-600 mb-4">Please log in to view your profile</p>
            <Button onClick={() => router?.push("/account/login")} className="bg-[#f26950] hover:bg-[#e05840]">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0] py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#f26950] to-[#e05840] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 border-2 border-white">
                  <AvatarImage src={user?.photoURL || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="bg-white text-[#f26950] text-lg font-bold">
                    {getInitials(profile.displayName || user?.email || "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profile.displayName || "User"}</h1>
                  <p className="opacity-90">{user?.email}</p>
                </div>
              </div>

              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="bg-white text-[#f26950] border-white hover:bg-gray-50"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="bg-white text-[#f26950] border-white hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSave} disabled={loading} className="bg-white text-[#f26950] hover:bg-gray-50">
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">{profile.favoriteRecipes}</div>
                <div className="text-sm opacity-90">Favorites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{profile.recipesCreated}</div>
                <div className="text-sm opacity-90">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center">
                  {profile.averageRating}
                  <Star className="w-4 h-4 ml-1 fill-current" />
                </div>
                <div className="text-sm opacity-90">Rating</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-6 space-y-6">
            {/* Display Name */}
            <div>
              <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                Display Name
              </Label>
              {isEditing ? (
                <Input
                  id="displayName"
                  value={editData.displayName}
                  onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
                  className="mt-1"
                  placeholder="Enter your display name"
                />
              ) : (
                <div className="flex items-center mt-2 p-3 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-gray-900">{profile.displayName || "Not set"}</span>
                </div>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <div className="flex items-center mt-2 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-gray-900">{user?.email}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location
              </Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="mt-1"
                  placeholder="Enter your location"
                />
              ) : (
                <div className="flex items-center mt-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-gray-900">{profile.location}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                About Me
              </Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="mt-1"
                  rows={3}
                  placeholder="Tell us about your cooking journey..."
                />
              ) : (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 leading-relaxed">{profile.bio}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/favorites">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Heart className="w-4 h-4 mr-2 text-[#f26950]" />
                    My Favorites
                  </Button>
                </Link>
                <Link href="/my-recipes">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <ChefHat className="w-4 h-4 mr-2 text-[#f26950]" />
                    My Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
