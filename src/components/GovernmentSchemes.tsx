import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const schemes = [
    {
      id: 1,
      name: "PM-KISAN",
      description: "Direct income support to farmers",
      amount: "₹6,000/year",
      eligibility: "Small & marginal farmers",
      status: "active",
      documents: ["Aadhaar", "Bank Account", "Land Records"],
      deadline: "2024-03-31",
      applied: true,
      progress: 75
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme",
      amount: "Up to ₹2 lakh coverage",
      eligibility: "All farmers",
      status: "active",
      documents: ["Aadhaar", "Land Records", "Sowing Certificate"],
      deadline: "2024-02-28",
      applied: false,
      progress: 0
    },
    {
      id: 3,
      name: "Kisan Credit Card",
      description: "Credit support for agriculture",
      amount: "Based on land holding",
      eligibility: "Landowner farmers",
      status: "active",
      documents: ["Land Records", "Income Certificate", "Bank Statement"],
      deadline: "2024-06-30",
      applied: true,
      progress: 100
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      description: "Soil testing and health monitoring",
      amount: "Free testing",
      eligibility: "All farmers",
      status: "active",
      documents: ["Aadhaar", "Land Records"],
      deadline: "2024-05-15",
      applied: false,
      progress: 0
    },
    {
      id: 5,
      name: "National Agriculture Market",
      description: "Online trading platform",
      amount: "Better price realization",
      eligibility: "Licensed farmers",
      status: "active",
      documents: ["Trade License", "Quality Certificate"],
      deadline: "Ongoing",
      applied: true,
      progress: 50
    }
  ];

  const myApplications = [
    {
      id: 1,
      scheme: "PM-KISAN",
      status: "Approved",
      amount: "₹2,000",
      date: "2024-01-15",
      nextInstallment: "2024-04-15"
    },
    {
      id: 2,
      scheme: "Kisan Credit Card",
      status: "Processing",
      amount: "₹50,000 limit",
      date: "2024-01-10",
      nextInstallment: null
    }
  ];

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-accent text-accent-foreground p-6">
        <h1 className="text-2xl font-bold mb-4">Government Schemes</h1>
        <Input
          placeholder="Search schemes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white text-foreground"
        />
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">3</div>
              <div className="text-sm text-muted-foreground">Applied</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">₹8,000</div>
              <div className="text-sm text-muted-foreground">Received</div>
            </CardContent>
          </Card>
        </div>

        {/* My Applications */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myApplications.map((app) => (
              <div key={app.id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-semibold">{app.scheme}</h3>
                  <p className="text-sm text-muted-foreground">Applied: {app.date}</p>
                  {app.nextInstallment && (
                    <p className="text-sm text-success">Next: {app.nextInstallment}</p>
                  )}
                </div>
                <div className="text-right">
                  <Badge 
                    variant={app.status === "Approved" ? "default" : "secondary"}
                  >
                    {app.status}
                  </Badge>
                  <p className="text-sm font-medium mt-1">{app.amount}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available Schemes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Schemes</h2>
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{scheme.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{scheme.description}</p>
                  </div>
                  <Badge variant={scheme.applied ? "default" : "outline"}>
                    {scheme.applied ? "Applied" : "Apply Now"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Amount: </span>
                    <span className="text-success">{scheme.amount}</span>
                  </div>
                  <div>
                    <span className="font-medium">Deadline: </span>
                    <span>{scheme.deadline}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Eligibility:</p>
                  <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Required Documents:</p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.documents.map((doc, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {scheme.applied && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Application Progress</span>
                      <span>{scheme.progress}%</span>
                    </div>
                    <Progress value={scheme.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    variant={scheme.applied ? "outline" : "default"}
                    className="flex-1"
                    disabled={scheme.applied}
                  >
                    {scheme.applied ? "Applied" : "Apply Now"}
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;