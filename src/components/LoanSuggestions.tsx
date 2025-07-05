import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const LoanSuggestions = () => {
  const [loanAmount, setLoanAmount] = useState([100000]);
  const [farmSize, setFarmSize] = useState("");
  const [purpose, setPurpose] = useState("");

  const loanTypes = [
    {
      id: 1,
      name: "Kisan Credit Card",
      bank: "State Bank of India",
      interestRate: "7.0%",
      maxAmount: "₹3 lakh",
      tenure: "1 year",
      processing: "Minimal",
      eligibility: "Landowner farmers",
      features: ["Flexible repayment", "No collateral", "Quick processing"],
      recommended: true
    },
    {
      id: 2,
      name: "Agriculture Term Loan",
      bank: "HDFC Bank",
      interestRate: "8.5%",
      maxAmount: "₹25 lakh",
      tenure: "5 years",
      processing: "1-2%",
      eligibility: "Farmers with land documents",
      features: ["Equipment purchase", "Land improvement", "Fixed interest"],
      recommended: false
    },
    {
      id: 3,
      name: "Crop Loan",
      bank: "Punjab National Bank",
      interestRate: "7.5%",
      maxAmount: "₹10 lakh",
      tenure: "1 year",
      processing: "0.5%",
      eligibility: "All farmers",
      features: ["Seasonal loans", "Input financing", "Government subsidy"],
      recommended: true
    },
    {
      id: 4,
      name: "Livestock Loan",
      bank: "Bank of Baroda",
      interestRate: "9.0%",
      maxAmount: "₹5 lakh",
      tenure: "3 years",
      processing: "1%",
      eligibility: "Dairy farmers",
      features: ["Animal purchase", "Dairy equipment", "Feed financing"],
      recommended: false
    },
    {
      id: 5,
      name: "Agri-Business Loan",
      bank: "ICICI Bank",
      interestRate: "10.0%",
      maxAmount: "₹50 lakh",
      tenure: "7 years",
      processing: "2%",
      eligibility: "FPOs and cooperatives",
      features: ["Processing units", "Storage facilities", "Marketing support"],
      recommended: false
    }
  ];

  const myLoans = [
    {
      id: 1,
      type: "Kisan Credit Card",
      bank: "SBI",
      amount: "₹1,50,000",
      outstanding: "₹75,000",
      nextDue: "2024-02-15",
      status: "Active"
    },
    {
      id: 2,
      type: "Equipment Loan",
      bank: "HDFC",
      amount: "₹3,00,000",
      outstanding: "₹2,10,000",
      nextDue: "2024-02-20",
      status: "Active"
    }
  ];

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-success text-success-foreground p-6">
        <h1 className="text-2xl font-bold mb-4">Loan Suggestions</h1>
        <p className="opacity-90">Find the best agricultural loans for your needs</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Loan Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Loan Amount: ₹{loanAmount[0].toLocaleString()}
              </label>
              <Slider
                value={loanAmount}
                onValueChange={setLoanAmount}
                max={2500000}
                min={25000}
                step={25000}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Farm Size (acres)</label>
                <Input 
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  placeholder="Enter farm size"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Purpose</label>
                <Input 
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g., Equipment, Seeds"
                />
              </div>
            </div>
            
            <Button className="w-full">Get Recommendations</Button>
          </CardContent>
        </Card>

        {/* My Loans */}
        <Card>
          <CardHeader>
            <CardTitle>My Active Loans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myLoans.map((loan) => (
              <div key={loan.id} className="p-4 border rounded space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{loan.type}</h3>
                    <p className="text-sm text-muted-foreground">{loan.bank}</p>
                  </div>
                  <Badge>{loan.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Loan Amount: </span>
                    <span className="font-medium">{loan.amount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Outstanding: </span>
                    <span className="font-medium text-destructive">{loan.outstanding}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next Due: {loan.nextDue}</span>
                  <Button size="sm" variant="outline">Make Payment</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Loans */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          {loanTypes.filter(loan => loan.recommended).map((loan) => (
            <Card key={loan.id} className="border-2 border-success">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{loan.name}</CardTitle>
                    <p className="text-muted-foreground">{loan.bank}</p>
                  </div>
                  <Badge className="bg-success">Recommended</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Interest Rate: </span>
                    <span className="font-medium text-success">{loan.interestRate}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Max Amount: </span>
                    <span className="font-medium">{loan.maxAmount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tenure: </span>
                    <span className="font-medium">{loan.tenure}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Processing: </span>
                    <span className="font-medium">{loan.processing}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Key Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {loan.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded">
                  <p className="text-sm font-medium">
                    Estimated EMI for ₹{loanAmount[0].toLocaleString()}: 
                    <span className="text-success ml-2">
                      ₹{calculateEMI(loanAmount[0], parseFloat(loan.interestRate), parseInt(loan.tenure)).toLocaleString()}
                    </span>
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">Apply Now</Button>
                  <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Loans */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Other Loan Options</h2>
          {loanTypes.filter(loan => !loan.recommended).map((loan) => (
            <Card key={loan.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{loan.name}</CardTitle>
                    <p className="text-muted-foreground">{loan.bank}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Rate: </span>
                    <span className="font-medium">{loan.interestRate}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount: </span>
                    <span className="font-medium">{loan.maxAmount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tenure: </span>
                    <span className="font-medium">{loan.tenure}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button variant="outline">Compare</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanSuggestions;
