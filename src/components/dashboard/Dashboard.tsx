
import { useState } from "react";
import UserProfile from "./UserProfile";
import ConsumptionWidget from "./ConsumptionWidget";
import UsageComparison from "./UsageComparison";
import SavingsOpportunities from "./SavingsOpportunities";
import AlertsNotifications from "./AlertsNotifications";
import CarbonImpact from "./CarbonImpact";
import { Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleTimeString());
      setIsRefreshing(false);
      toast.success("Dashboard data refreshed");
    }, 1000);
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-electra-info" />
          <h1 className="text-2xl font-bold">Electra Energy Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Last updated: {lastUpdated}</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfile />
        </div>
        <div className="md:col-span-2">
          <ConsumptionWidget />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsageComparison />
        <SavingsOpportunities />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertsNotifications />
        <CarbonImpact />
      </div>
    </div>
  );
};

export default Dashboard;
