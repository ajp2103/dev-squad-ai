import { Header } from "@/components/Header";
import { AgentDashboard } from "@/components/AgentDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AgentDashboard />
    </div>
  );
};

export default Index;
