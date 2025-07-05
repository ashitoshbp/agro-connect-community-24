import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: "🌾" },
    { id: "grains", name: "Grains", icon: "🌾" },
    { id: "vegetables", name: "Vegetables", icon: "🥕" },
    { id: "fruits", name: "Fruits", icon: "🍎" },
    { id: "livestock", name: "Livestock", icon: "🐄" },
    { id: "equipment", name: "Equipment", icon: "🚜" },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      price: "₹45/kg",
      seller: "Rajesh Farm",
      location: "Punjab",
      rating: 4.8,
      image: "🌾",
      category: "grains",
      quantity: "500kg available",
      organic: true
    },
    {
      id: 2,
      name: "Fresh Tomatoes",
      price: "₹25/kg",
      seller: "Green Valley",
      location: "Maharashtra",
      rating: 4.5,
      image: "🍅",
      category: "vegetables",
      quantity: "200kg available",
      organic: false
    },
    {
      id: 3,
      name: "Alphonso Mangoes",
      price: "₹180/kg",
      seller: "Mango King",
      location: "Maharashtra",
      rating: 4.9,
      image: "🥭",
      category: "fruits",
      quantity: "100kg available",
      organic: true
    },
    {
      id: 4,
      name: "Holstein Cow",
      price: "₹45,000/head",
      seller: "Dairy Pro",
      location: "Haryana",
      rating: 4.7,
      image: "🐄",
      category: "livestock",
      quantity: "5 available",
      organic: false
    },
    {
      id: 5,
      name: "John Deere Tractor",
      price: "₹8,50,000",
      seller: "Farm Equipment Ltd",
      location: "Gujarat",
      rating: 4.6,
      image: "🚜",
      category: "equipment",
      quantity: "2 available",
      organic: false
    },
    {
      id: 6,
      name: "Fresh Wheat",
      price: "₹22/kg",
      seller: "Golden Fields",
      location: "Uttar Pradesh",
      rating: 4.4,
      image: "🌾",
      category: "grains",
      quantity: "1000kg available",
      organic: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
        <Input
          placeholder="Search products, sellers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white text-foreground"
        />
      </div>

      <div className="p-6 space-y-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex-shrink-0"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy Products</TabsTrigger>
            <TabsTrigger value="sell">Sell Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            {/* Product Grid */}
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="text-4xl">{product.image}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">{product.price}</div>
                            {product.organic && (
                              <Badge variant="secondary" className="mt-1">
                                Organic
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Seller: {product.seller}</p>
                          <p>Location: {product.location}</p>
                          <p>{product.quantity}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm">{product.rating}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Contact
                            </Button>
                            <Button size="sm">
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>List Your Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Product name" />
                <Input placeholder="Price per unit" />
                <Input placeholder="Quantity available" />
                <Input placeholder="Location" />
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Add Photos</Button>
                  <Button>List Product</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* My Listings */}
            <Card>
              <CardHeader>
                <CardTitle>My Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Premium Basmati Rice</p>
                      <p className="text-sm text-muted-foreground">₹45/kg • 50kg available</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Fresh Vegetables</p>
                      <p className="text-sm text-muted-foreground">₹30/kg • 25kg available</p>
                    </div>
                    <Badge variant="secondary">Sold Out</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;