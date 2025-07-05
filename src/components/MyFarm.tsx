import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, TrendingUp } from "lucide-react";

const MyFarm = () => {
  const [selectedFeature, setSelectedFeature] = useState("classification");

  const aiFeatures = [
    {
      id: "classification",
      title: "Text Classification",
      icon: Bot,
      description: "Claude 3.7 Sonnet for government scheme classification",
      color: "bg-destructive/10 text-destructive",
      status: "LLM Integration",
      action: "Classify Text"
    },
    {
      id: "recommendations",
      title: "Smart Recommendations", 
      icon: TrendingUp,
      description: "Collaborative filtering & metadata analysis",
      color: "bg-primary/10 text-primary",
      status: "ML Models Active",
      action: "Get Recommendations"
    },
    {
      id: "scraping",
      title: "Data Scraping Engine",
      icon: Bot,
      description: "Mistral AI powered data extraction",
      color: "bg-accent/10 text-accent-foreground",
      status: "Automated Pipeline",
      action: "View Data"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">AI & Automation</h1>
          <p className="text-muted-foreground">
            Advanced AI features for agricultural automation
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className="cursor-pointer transition-all hover:shadow-md border-2 hover:border-primary/20"
                onClick={() => setSelectedFeature(feature.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      Advanced AI
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {feature.status}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={selectedFeature === feature.id ? "default" : "outline"}
                    >
                      {feature.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyFarm;