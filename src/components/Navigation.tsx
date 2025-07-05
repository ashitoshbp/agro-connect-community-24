
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ChatInterface from "./ChatInterface";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'marketplace', icon: '🛒', label: 'Market' },
    { id: 'myfarm', icon: '🌱', label: 'My Farm' },
    { id: 'schemes', icon: '🏛️', label: 'Schemes' },
    { id: 'loans', icon: '💰', label: 'Loans' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  // Split navigation items for left and right sides
  const leftItems = navItems.slice(0, 3);
  const rightItems = navItems.slice(3);

  return (
    <>
      <Card className="fixed bottom-0 left-0 right-0 z-40 rounded-none border-t">
        <CardContent className="p-0">
          <div className="flex items-center justify-between relative">
            {/* Left Navigation Items */}
            <div className="flex flex-1">
              {leftItems.map((item) => (
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

            {/* Center AI Chat Button */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
              <Button
                onClick={() => setIsChatOpen(true)}
                size="icon"
                className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="h-8 w-8 text-white" />
              </Button>
              <div className="text-center mt-1">
                <span className="text-xs font-medium text-green-600">AI Chat</span>
              </div>
            </div>

            {/* Right Navigation Items */}
            <div className="flex flex-1">
              {rightItems.map((item) => (
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
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default Navigation;
