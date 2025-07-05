import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-farm.jpg";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      id: 1,
      title: "Marketplace",
      description: "Buy and sell agricultural products directly",
      icon: "🌾",
      color: "bg-primary",
      path: "/marketplace"
    },
    {
      id: 2,
      title: "Government Schemes",
      description: "Access government agricultural schemes and subsidies",
      icon: "🏛️",
      color: "bg-accent",
      path: "/schemes"
    },
    {
      id: 3,
      title: "Loan Suggestions",
      description: "Get personalized agricultural loan recommendations",
      icon: "💰",
      color: "bg-success",
      path: "/loans"
    },
    {
      id: 4,
      title: "Procurement",
      description: "Bulk procurement and supply chain management",
      icon: "📦",
      color: "bg-secondary",
      path: "/procurement"
    },
    {
      id: 5,
      title: "Logistics",
      description: "Transportation and delivery services",
      icon: "🚚",
      color: "bg-primary-light",
      path: "/logistics"
    },
    {
      id: 6,
      title: "Labor Marketplace",
      description: "Find agricultural workers and contractors",
      icon: "👥",
      color: "bg-muted",
      path: "/labor"
    }
  ];

  const recentActivity = [
    { id: 1, action: "Listed 50kg Rice", time: "2 hours ago", status: "active" },
    { id: 2, action: "Applied for PM-KISAN", time: "1 day ago", status: "pending" },
    { id: 3, action: "Booked Transportation", time: "2 days ago", status: "completed" },
  ];

  const stats = [
    { label: "Active Listings", value: "12", change: "+2" },
    { label: "Total Sales", value: "₹45,000", change: "+₹5,000" },
    { label: "Applications", value: "3", change: "0" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Agricultural landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Welcome to AgroConnect
          </h1>
          <p className="text-lg text-center opacity-90">
            Your complete agricultural marketplace
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="w-full">
          <Input
            placeholder="Search products, schemes, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 text-lg"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <Badge variant="secondary" className="mt-1">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <Card 
              key={feature.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <Badge 
                  variant={
                    activity.status === "completed" ? "default" :
                    activity.status === "pending" ? "secondary" : "outline"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-14 text-lg">
            🌱 List Product
          </Button>
          <Button variant="outline" className="h-14 text-lg">
            📞 Get Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;