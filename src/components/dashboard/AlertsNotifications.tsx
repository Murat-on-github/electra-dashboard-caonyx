
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock alerts data
const alertsData = [
  {
    id: 1,
    title: "Unusual consumption detected",
    description: "Your HVAC system showed a 30% increase in consumption in the last hour.",
    time: "15 min ago",
    type: "warning",
  },
  {
    id: 2,
    title: "Daily usage threshold exceeded",
    description: "You've exceeded your daily usage threshold by 2 kWh.",
    time: "2 hours ago",
    type: "alert",
  },
  {
    id: 3,
    title: "Off-peak hour started",
    description: "Electricity is now billed at off-peak rates until 06:00.",
    time: "10:00 PM",
    type: "info",
  },
];

const AlertsNotifications = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-electra-warning" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-electra-accent" />;
      case 'info':
        return <Info className="h-5 w-5 text-electra-info" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };
  
  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return <Badge variant="outline" className="bg-electra-warning/20 text-electra-warning border-electra-warning">Warning</Badge>;
      case 'alert':
        return <Badge variant="outline" className="bg-electra-accent/20 text-electra-accent border-electra-accent">Alert</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-electra-info/20 text-electra-info border-electra-info">Info</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">Alerts & Notifications</CardTitle>
            <Badge className="bg-electra-accent text-white">{alertsData.length}</Badge>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {alertsData.map((alert) => (
            <div key={alert.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getAlertIcon(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">{alert.title}</span>
                    {getAlertBadge(alert.type)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
              {alert.id !== alertsData.length && <Separator />}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-2 border-t border-border">
          <Button variant="outline" className="w-full text-sm" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Configure Alert Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsNotifications;
