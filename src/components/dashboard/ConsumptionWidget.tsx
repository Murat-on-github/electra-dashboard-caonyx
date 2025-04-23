
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";

// Mock data for device consumption
const deviceData = [
  { id: 1, name: "HVAC", power: 1200, percentage: 32, efficiency: "normal", color: "#2196F3" },
  { id: 2, name: "Refrigerator", power: 800, percentage: 21, efficiency: "low", color: "#F44336" },
  { id: 3, name: "Washing Machine", power: 600, percentage: 16, efficiency: "normal", color: "#4CAF50" },
  { id: 4, name: "Lighting", power: 450, percentage: 12, efficiency: "high", color: "#FF9800" },
  { id: 5, name: "TV & Entertainment", power: 380, percentage: 10, efficiency: "normal", color: "#9C27B0" },
  { id: 6, name: "Kitchen Appliances", power: 350, percentage: 9, efficiency: "normal", color: "#00BCD4" },
];

const ConsumptionWidget = () => {
  const [totalPower, setTotalPower] = useState(0);
  
  useEffect(() => {
    // Calculate total power consumption
    const total = deviceData.reduce((sum, device) => sum + device.power, 0);
    setTotalPower(total);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      // This would be replaced with real data fetching in a production app
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate bubble sizes based on percentage
  const getSize = (percentage: number) => {
    return 40 + (percentage * 2.5);
  };

  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Real-Time Consumption</CardTitle>
        <Badge variant="outline" className="bg-secondary/30">
          {totalPower}W Total
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative h-64 w-full">
          <TooltipProvider>
            {deviceData.map((device) => (
              <Tooltip key={device.id}>
                <TooltipTrigger asChild>
                  <div 
                    className="absolute rounded-full flex items-center justify-center animate-pulse-slow cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: `${device.color}33`, // Add transparency
                      border: `2px solid ${device.color}`,
                      width: `${getSize(device.percentage)}px`,
                      height: `${getSize(device.percentage)}px`,
                      left: `${(device.id * 15) % 75}%`,
                      top: `${((device.id * 20) % 60) + 10}%`,
                    }}
                  >
                    <span className="text-xs font-medium text-white">
                      {device.percentage}%
                    </span>
                    {device.efficiency === "low" && (
                      <AlertCircle className="absolute -top-1 -right-1 h-4 w-4 text-electra-accent" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-2">
                    <p className="font-bold">{device.name}</p>
                    <p className="text-xs">{device.power}W ({device.percentage}%)</p>
                    {device.efficiency === "low" && (
                      <p className="text-xs text-electra-accent mt-1">Inefficient usage detected!</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {deviceData.map((device) => (
            <div key={device.id} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: device.color }}
              ></div>
              <span className="text-muted-foreground">{device.name}</span>
              {device.efficiency === "low" && (
                <AlertCircle className="h-3 w-3 text-electra-accent ml-auto" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumptionWidget;
