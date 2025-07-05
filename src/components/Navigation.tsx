import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'marketplace', icon: '🛒', label: 'Market' },
    { id: 'myfarm', icon: '🌱', label: 'My Farm' },
    { id: 'schemes', icon: '🏛️', label: 'Schemes' },
    { id: 'loans', icon: '💰', label: 'Loans' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t">
      <CardContent className="p-0">
        <div className="flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex-1 p-4 text-center transition-colors ${
                currentView === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-xs font-medium">{item.label}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Navigation;