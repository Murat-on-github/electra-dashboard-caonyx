
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, Users, MapPin, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const UserProfile = () => {
  // Mock user data
  const userData = {
    propertySize: "120 m²",
    householdSize: 3 bedroom appartment,
    location: "Nicosia, Strovolos",
    baselineConsumption: "310 kWh/month",
    tariffPlan: "Green Energy Pro",
    peakHours: "17:00 - 21:00",
    offPeakHours: "22:00 - 06:00",
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Property Size</span>
              <span className="ml-auto text-sm font-medium">{userData.propertySize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Household</span>
              <span className="ml-auto text-sm font-medium">{userData.householdSize} people</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="ml-auto text-sm font-medium">{userData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Baseline</span>
              <span className="ml-auto text-sm font-medium">{userData.baselineConsumption}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Tariff Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Plan:</span>
                <span className="text-sm font-medium">{userData.tariffPlan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Peak Hours:</span>
                <span className="text-sm font-medium text-electra-accent">{userData.peakHours}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Off-Peak:</span>
                <span className="text-sm font-medium text-electra-success">{userData.offPeakHours}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
