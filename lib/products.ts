export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  description: string
  rating: number
  reviews: Review[]
  isNew?: boolean
  isBestseller?: boolean
  inStock: boolean
  sizes?: string[]
  colors?: string[]
}

export interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Velociraptor Hunt Poster",
    price: 299,
    originalPrice: 499,
    image: "/placeholder.svg?height=400&width=300&text=Velociraptor+Hunt",
    category: "posters",
    description: "Premium quality poster featuring a pack of velociraptors in their natural hunting environment",
    rating: 4.8,
    reviews: [
      { id: "1", user: "Alex", rating: 5, comment: "Amazing quality!", date: "2024-01-15" },
      { id: "2", user: "Sarah", rating: 4, comment: "Love the design", date: "2024-01-10" },
    ],
    isNew: true,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "2",
    name: "T-Rex Roar T-Shirt",
    price: 599,
    originalPrice: 899,
    image: "/placeholder.svg?height=400&width=300&text=T-Rex+Roar+Tshirt",
    category: "tshirts",
    description: "Premium cotton t-shirt with fierce T-Rex design",
    rating: 4.7,
    reviews: [
      { id: "3", user: "Mike", rating: 5, comment: "Perfect fit!", date: "2024-01-12" },
      { id: "4", user: "Emma", rating: 4, comment: "Great quality", date: "2024-01-08" },
    ],
    isBestseller: true,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
  },
  {
    id: "3",
    name: "Raptor Pack Polaroid Set",
    price: 399,
    originalPrice: 599,
    image: "/placeholder.svg?height=400&width=300&text=Raptor+Polaroids",
    category: "polaroids",
    description: "Vintage-style polaroid collection featuring different raptor species",
    rating: 4.9,
    reviews: [
      { id: "5", user: "John", rating: 5, comment: "Unique collection!", date: "2024-01-14" },
      { id: "6", user: "Lisa", rating: 5, comment: "Perfect for my wall", date: "2024-01-09" },
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Jurassic Landscape Poster",
    price: 349,
    originalPrice: 549,
    image: "/placeholder.svg?height=400&width=300&text=Jurassic+Landscape",
    category: "posters",
    description: "Breathtaking prehistoric landscape with various dinosaur species",
    rating: 4.6,
    reviews: [
      { id: "7", user: "David", rating: 5, comment: "Stunning artwork!", date: "2024-01-13" },
      { id: "8", user: "Anna", rating: 4, comment: "Beautiful colors", date: "2024-01-07" },
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Raptor Claw T-Shirt",
    price: 549,
    originalPrice: 799,
    image: "/placeholder.svg?height=400&width=300&text=Raptor+Claw+Tshirt",
    category: "tshirts",
    description: "Edgy design featuring detailed raptor claw artwork",
    rating: 4.8,
    reviews: [
      { id: "9", user: "Chris", rating: 5, comment: "Love the design!", date: "2024-01-11" },
      { id: "10", user: "Maya", rating: 4, comment: "Great material", date: "2024-01-06" },
    ],
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Dark Gray"],
  },
  {
    id: "6",
    name: "Prehistoric Moments Polaroids",
    price: 449,
    originalPrice: 649,
    image: "/placeholder.svg?height=400&width=300&text=Prehistoric+Moments",
    category: "polaroids",
    description: "Artistic polaroid series capturing prehistoric life moments",
    rating: 4.7,
    reviews: [
      { id: "11", user: "Tom", rating: 5, comment: "Artistic masterpiece!", date: "2024-01-10" },
      { id: "12", user: "Sophie", rating: 4, comment: "Very creative", date: "2024-01-05" },
    ],
    inStock: true,
  },
  {
    id: "7",
    name: "Alpha Raptor Poster",
    price: 399,
    originalPrice: 599,
    image: "/placeholder.svg?height=400&width=300&text=Alpha+Raptor",
    category: "posters",
    description: "Majestic alpha raptor in a commanding pose",
    rating: 4.9,
    reviews: [
      { id: "13", user: "Jake", rating: 5, comment: "Powerful image!", date: "2024-01-09" },
      { id: "14", user: "Rachel", rating: 5, comment: "Perfect for my room", date: "2024-01-04" },
    ],
    isBestseller: true,
    inStock: true,
  },
  {
    id: "8",
    name: "Dino Evolution T-Shirt",
    price: 649,
    originalPrice: 949,
    image: "/placeholder.svg?height=400&width=300&text=Dino+Evolution",
    category: "tshirts",
    description: "Educational design showing dinosaur evolution timeline",
    rating: 4.6,
    reviews: [
      { id: "15", user: "Ben", rating: 4, comment: "Educational and cool!", date: "2024-01-08" },
      { id: "16", user: "Kate", rating: 5, comment: "Love learning", date: "2024-01-03" },
    ],
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Forest Green", "Black"],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}

export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return []

  const results = searchProducts(query)
  const suggestions = [
    ...new Set([
      ...results.slice(0, 3).map((p) => p.name),
      ...results
        .map((p) => p.category)
        .filter((cat, index, arr) => arr.indexOf(cat) === index)
        .slice(0, 2),
    ]),
  ].slice(0, 5)

  return suggestions
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isBestseller || product.isNew).slice(0, 6)
}

export function getRelatedProducts(productId: string, category: string): Product[] {
  return products.filter((product) => product.category === category && product.id !== productId).slice(0, 4)
}
