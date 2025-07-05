
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
    { id: 'myfarm', icon: '🌱', label: 'Farm' },
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
          <div className="flex items-center justify-between relative px-2">
            {/* Left Navigation Items */}
            <div className="flex">
              {leftItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-2 py-3 text-center transition-colors min-w-0 flex-shrink-0 ${
                    currentView === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ minWidth: '60px' }}
                >
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-[10px] font-medium leading-tight">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Center AI Chat Button */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 flex flex-col items-center">
              <Button
                onClick={() => setIsChatOpen(true)}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </Button>
              <div className="text-center mt-1">
                <span className="text-[10px] font-medium text-green-600">AI Chat</span>
              </div>
            </div>

            {/* Right Navigation Items */}
            <div className="flex">
              {rightItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-2 py-3 text-center transition-colors min-w-0 flex-shrink-0 ${
                    currentView === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ minWidth: '60px' }}
                >
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-[10px] font-medium leading-tight">{item.label}</div>
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
