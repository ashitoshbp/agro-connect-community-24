import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Marketplace from "@/components/Marketplace";
import MyFarm from "@/components/MyFarm";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import LoanSuggestions from "@/components/LoanSuggestions";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'marketplace':
        return <Marketplace />;
      case 'myfarm':
        return <MyFarm />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'loans':
        return <LoanSuggestions />;
      case 'profile':
        return (
          <div className="min-h-screen bg-background p-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p className="text-muted-foreground">Profile section coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {renderView()}
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
};

export default Index;
