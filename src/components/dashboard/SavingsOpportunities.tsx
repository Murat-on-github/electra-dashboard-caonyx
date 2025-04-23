
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ChevronRight, LightbulbIcon, WashingMachine, Refrigerator } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock savings opportunities
const savingsData = [
  {
    id: 1,
    title: "Shift laundry to off-peak hours",
    description: "You could save €12/month by moving your laundry cycles to off-peak hours (22:00-06:00).",
    saving: "€12/month",
    icon: WashingMachine,
    priority: "high",
  },
  {
    id: 2,
    title: "Replace refrigerator",
    description: "Your refrigerator is 10+ years old. A new energy-efficient model could reduce your bill by €15/month.",
    saving: "€15/month",
    icon: Refrigerator,
    priority: "medium",
  },
  {
    id: 3,
    title: "Replace bulbs with LEDs",
    description: "Replacing remaining traditional bulbs with LEDs could save €8/month on lighting costs.",
    saving: "€8/month",
    icon: LightbulbIcon,
    priority: "low",
  },
];

const SavingsOpportunities = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-electra-accent/20 border-electra-accent text-electra-accent';
      case 'medium':
        return 'bg-electra-warning/20 border-electra-warning text-electra-warning';
      case 'low':
        return 'bg-electra-success/20 border-electra-success text-electra-success';
      default:
        return 'bg-secondary/20 border-secondary text-primary';
    }
  };

  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Energy Saving Opportunities</CardTitle>
          <Button variant="ghost" className="h-8 px-2 text-sm">View all</Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {savingsData.map((item) => (
            <div 
              key={item.id}
              className="flex items-start gap-4 p-3 rounded-lg border border-transparent hover:border-border cursor-pointer transition-all"
            >
              <div className={`p-2 rounded-full ${getPriorityColor(item.priority)}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-electra-success">{item.saving}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground mt-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsOpportunities;
