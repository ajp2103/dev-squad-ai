import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Settings, TestTube, FileText, GitBranch } from "lucide-react";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    role: string;
    description: string;
    color: string;
    icon: React.ReactNode;
    capabilities: string[];
    status: 'available' | 'busy' | 'training';
  };
  onSelect: (agentId: string) => void;
}

export const AgentCard = ({ agent, onSelect }: AgentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-accent';
      case 'busy': return 'bg-destructive';
      case 'training': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getAgentVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'product owner': return 'product-owner';
      case 'developer': return 'developer';
      case 'scrum master': return 'scrum-master';
      case 'tester': return 'tester';
      default: return 'default';
    }
  };

  return (
    <Card className="group relative p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-enterprise backdrop-blur-sm overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-card/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} animate-pulse-ai`} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${agent.color} text-white shadow-soft`}>
              {agent.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{agent.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">{agent.role}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {agent.description}
        </p>

        {/* Capabilities */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Key Capabilities
          </h4>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.slice(0, 3).map((capability, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {capability}
              </Badge>
            ))}
            {agent.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{agent.capabilities.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Status and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
            <span className="text-xs font-medium text-muted-foreground capitalize">
              {agent.status}
            </span>
          </div>
          
          <Button 
            variant={getAgentVariant(agent.role) as any}
            size="sm"
            onClick={() => onSelect(agent.id)}
            className="group-hover:shadow-ai-glow transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>
    </Card>
  );
};