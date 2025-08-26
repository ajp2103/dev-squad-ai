import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Paperclip, 
  ArrowLeft, 
  Bot, 
  User, 
  FileText,
  Download,
  RefreshCw,
  Zap
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  attachments?: { name: string; type: string }[];
  artifacts?: { type: string; title: string; content: string }[];
}

interface ChatInterfaceProps {
  agent: {
    id: string;
    name: string;
    role: string;
    color: string;
    icon: React.ReactNode;
  };
  onBack: () => void;
}

export const ChatInterface = ({ agent, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: `Hello! I'm ${agent.name}, your AI assistant for ${agent.role.toLowerCase()} tasks. I can help you with drafting user stories, creating Jira tickets, analyzing requirements, and leveraging historical project data. How can I assist you today?`,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      attachments: attachedFiles.map(file => ({ name: file.name, type: file.type }))
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setAttachedFiles([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `I understand you need assistance with ${agent.role.toLowerCase()} tasks. Based on your input, I'll help you create the necessary documentation and Jira tickets. Let me analyze the requirements and provide you with structured deliverables.`,
        timestamp: new Date(),
        artifacts: [
          {
            type: 'draft',
            title: `${agent.role} Deliverable Draft`,
            content: 'This would contain the AI-generated content based on your requirements...'
          }
        ]
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files attached",
      description: `${files.length} file(s) ready for context analysis`,
    });
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full bg-gradient-enterprise">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className={`p-2 rounded-lg ${agent.color} text-white`}>
              {agent.icon}
            </div>
            <div>
              <h2 className="font-semibold text-lg">{agent.name}</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {agent.role}
                </Badge>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse-ai" />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              New Session
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-3 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : `${agent.color} text-white`
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message content */}
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <Card className={`p-4 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground border-primary/20' 
                      : 'bg-card border-border/50'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <div className="flex flex-wrap gap-2">
                          {message.attachments.map((attachment, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <FileText className="w-3 h-3 mr-1" />
                              {attachment.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Artifacts */}
                    {message.artifacts && message.artifacts.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {message.artifacts.map((artifact, index) => (
                          <Card key={index} className="p-3 bg-muted/30 border-border/30">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium">{artifact.title}</h4>
                              <Button variant="ghost" size="sm">
                                <Zap className="w-3 h-3 mr-1" />
                                Deploy to Jira
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{artifact.content}</p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </Card>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex space-x-3 max-w-3xl">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${agent.color} text-white`}>
                  <Bot className="w-4 h-4 animate-pulse-ai" />
                </div>
                <Card className="p-4 bg-card border-border/50">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
        {/* Attached files */}
        {attachedFiles.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  {file.name}
                  <button
                    onClick={() => removeAttachment(index)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <Separator className="mt-2" />
          </div>
        )}

        <div className="flex items-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFileAttach}
            className="mb-1"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask ${agent.name} about ${agent.role.toLowerCase()} tasks...`}
              className="resize-none border-border/50 focus:border-primary/50"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || (!inputValue.trim() && attachedFiles.length === 0)}
            className="mb-1"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt,.md"
        />
      </div>
    </div>
  );
};