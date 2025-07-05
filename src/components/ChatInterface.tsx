
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mic, Camera, Paperclip, Send, X, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'voice' | 'image' | 'file';
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface = ({ isOpen, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Ready to start conversation! Your AI assistant is ready!',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you said: "${inputText}". How can I help you with your farming needs today?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Voice Recording Started",
        description: "Speak now, tap the mic again to stop",
      });
      
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        setIsProcessing(true);
        
        setTimeout(() => {
          setIsProcessing(false);
          const voiceMessage: Message = {
            id: Date.now().toString(),
            text: "Voice message transcribed: How can I improve my crop yield?",
            sender: 'user',
            timestamp: new Date(),
            type: 'voice'
          };
          setMessages(prev => [...prev, voiceMessage]);
          
          // AI response to voice
          setTimeout(() => {
            const aiResponse: Message = {
              id: (Date.now() + 1).toString(),
              text: "Great question! To improve crop yield, consider soil testing, proper irrigation, and using quality fertilizers. Would you like specific recommendations for your crop type?",
              sender: 'ai',
              timestamp: new Date(),
              type: 'text'
            };
            setMessages(prev => [...prev, aiResponse]);
          }, 1500);
        }, 2000);
      }, 3000);
    } else {
      setIsRecording(false);
      toast({
        title: "Recording Stopped",
        description: "Processing your voice message...",
      });
    }
  };

  const handleCameraCapture = () => {
    toast({
      title: "Camera Feature",
      description: "Camera functionality would open here for crop analysis",
    });
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `File attached: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file'
      };
      setMessages(prev => [...prev, fileMessage]);
      
      toast({
        title: "File Attached",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
      <Card className="w-full max-w-md h-[80vh] flex flex-col bg-gradient-to-b from-green-50 to-white">
        <CardHeader className="pb-3 border-b bg-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <CardTitle className="text-lg text-green-800">Farm Assistant</CardTitle>
                <p className="text-sm text-green-600">Your AI farming expert</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          {isProcessing && (
            <Badge variant="secondary" className="w-fit">
              Processing voice...
            </Badge>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.type === 'voice' && (
                      <Badge variant="outline" className="text-xs">Voice</Badge>
                    )}
                    {message.type === 'file' && (
                      <Badge variant="outline" className="text-xs">File</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            {/* Action Buttons */}
            <div className="flex justify-center gap-2">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={handleVoiceRecord}
                className={isRecording ? "animate-pulse" : ""}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={handleCameraCapture}>
                <Camera className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleFileAttach}>
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>

            {/* Text Input */}
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your farming question..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  );
};

export default ChatInterface;
