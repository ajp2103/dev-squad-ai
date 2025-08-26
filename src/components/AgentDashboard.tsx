import { useState } from "react";
import { AgentCard } from "./AgentCard";
import { ChatInterface } from "./ChatInterface";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Code, 
  Settings, 
  TestTube, 
  FileText, 
  GitBranch,
  Zap,
  Database,
  Users,
  Clock
} from "lucide-react";

const agents = [
  {
    id: 'product-owner',
    name: 'ProductOwner AI',
    role: 'Product Owner',
    description: 'Expert in drafting epics, user stories, and requirement analysis. Integrates with Jira for seamless project management and leverages historical data for informed decisions.',
    color: 'bg-product-owner',
    icon: <User className="w-5 h-5" />,
    capabilities: [
      'Epic Creation', 
      'User Story Drafting', 
      'Requirement Analysis', 
      'Sprint Planning', 
      'Jira Integration',
      'Historical Data Analysis'
    ],
    status: 'available' as const
  },
  {
    id: 'developer',
    name: 'Developer AI',
    role: 'Developer',
    description: 'Specialized in breaking down user stories into technical tasks, creating development workflows, and providing code architecture guidance with Jira integration.',
    color: 'bg-developer',
    icon: <Code className="w-5 h-5" />,
    capabilities: [
      'Task Breakdown', 
      'Technical Analysis', 
      'Code Architecture', 
      'Workflow Design', 
      'Jira Task Creation',
      'Development Planning'
    ],
    status: 'available' as const
  },
  {
    id: 'scrum-master',
    name: 'ScrumMaster AI',
    role: 'Scrum Master',
    description: 'Facilitates agile processes, creates Jira boards, manages sprint planning, and optimizes team workflows based on historical performance data.',
    color: 'bg-scrum-master',
    icon: <Settings className="w-5 h-5" />,
    capabilities: [
      'Board Creation', 
      'Sprint Planning', 
      'Process Optimization', 
      'Team Analytics', 
      'Workflow Management',
      'Performance Tracking'
    ],
    status: 'available' as const
  },
  {
    id: 'tester',
    name: 'Tester AI',
    role: 'Tester',
    description: 'Creates comprehensive test cases, maps testing scenarios to user stories, and maintains quality assurance standards with full Jira integration.',
    color: 'bg-tester',
    icon: <TestTube className="w-5 h-5" />,
    capabilities: [
      'Test Case Creation', 
      'Scenario Mapping', 
      'Quality Assurance', 
      'Test Planning', 
      'Bug Tracking',
      'Coverage Analysis'
    ],
    status: 'available' as const
  }
];

export const AgentDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleBackToDashboard = () => {
    setSelectedAgent(null);
  };

  const currentAgent = agents.find(agent => agent.id === selectedAgent);

  if (selectedAgent && currentAgent) {
    return (
      <div className="h-screen flex flex-col">
        <ChatInterface 
          agent={currentAgent} 
          onBack={handleBackToDashboard}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-enterprise">
      {/* Hero Section */}
      <div className="bg-gradient-ai text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered SDLC Assistant
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your software development lifecycle with intelligent AI agents. 
            Streamline epic creation, development planning, scrum management, and testing 
            with seamless Jira integration.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Context Aware</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5" />
              <span>Jira Integrated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center border-0 shadow-soft bg-card/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-product-owner text-white mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">4</h3>
            <p className="text-sm text-muted-foreground">AI Agents Ready</p>
          </Card>
          
          <Card className="p-6 text-center border-0 shadow-soft bg-card/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-developer text-white mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">∞</h3>
            <p className="text-sm text-muted-foreground">Jira Integrations</p>
          </Card>
          
          <Card className="p-6 text-center border-0 shadow-soft bg-card/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-scrum-master text-white mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">24/7</h3>
            <p className="text-sm text-muted-foreground">Context Memory</p>
          </Card>
          
          <Card className="p-6 text-center border-0 shadow-soft bg-card/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-tester text-white mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Real-time</h3>
            <p className="text-sm text-muted-foreground">Processing</p>
          </Card>
        </div>

        {/* Agent Selection */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your AI Assistant
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the specialized AI agent that matches your current needs. 
              Each agent brings role-specific expertise and seamless integration capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onSelect={handleAgentSelect}
              />
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <Card className="p-8 bg-gradient-enterprise border-0 shadow-medium">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready for Enterprise Integration
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect your Jira workspace, upload historical data, and let our AI agents 
              transform your SDLC with intelligent automation and context-aware assistance.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="ai" size="lg">
                <GitBranch className="w-5 h-5 mr-2" />
                Connect Jira
              </Button>
              <Button variant="enterprise" size="lg">
                <Database className="w-5 h-5 mr-2" />
                Upload Historical Data
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};