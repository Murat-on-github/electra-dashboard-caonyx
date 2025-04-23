
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, ResponsiveContainer, XAxis, YAxis, Area, Bar, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

// Mock data for usage comparison
const weeklyData = [
  { name: 'Mon', current: 45, previous: 38, average: 40 },
  { name: 'Tue', current: 52, previous: 42, average: 45 },
  { name: 'Wed', current: 49, previous: 45, average: 48 },
  { name: 'Thu', current: 63, previous: 51, average: 50 },
  { name: 'Fri', current: 58, previous: 55, average: 52 },
  { name: 'Sat', current: 48, previous: 47, average: 45 },
  { name: 'Sun', current: 42, previous: 40, average: 38 },
];

const monthlyData = [
  { name: 'Jan', current: 320, previous: 300, average: 310 },
  { name: 'Feb', current: 310, previous: 290, average: 300 },
  { name: 'Mar', current: 340, previous: 320, average: 315 },
  { name: 'Apr', current: 380, previous: 350, average: 325 },
  { name: 'May', current: 330, previous: 310, average: 320 },
  { name: 'Jun', current: 350, previous: 320, average: 330 },
];

const UsageComparison = () => {
  // Calculate percentage difference
  const calculateDifference = () => {
    const totalCurrent = weeklyData.reduce((sum, day) => sum + day.current, 0);
    const totalAverage = weeklyData.reduce((sum, day) => sum + day.average, 0);
    const percentageDiff = ((totalCurrent - totalAverage) / totalAverage) * 100;
    return percentageDiff.toFixed(0);
  };

  const diff = calculateDifference();
  const isHigher = parseInt(diff) > 0;

  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Usage Comparison</CardTitle>
          <span 
            className={`text-sm font-medium ${isHigher ? 'text-electra-accent' : 'text-electra-success'}`}
          >
            You use {diff}% {isHigher ? 'more' : 'less'} than similar households
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9800" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF9800" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }} 
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="current" stroke="#2196F3" fillOpacity={1} fill="url(#colorCurrent)" />
                <Area type="monotone" dataKey="average" stroke="#FF9800" fillOpacity={1} fill="url(#colorAverage)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#2196F3]"></div>
                <span className="text-xs text-muted-foreground">Your usage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF9800]"></div>
                <span className="text-xs text-muted-foreground">Similar households</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-0">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#444444" vertical={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }} 
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="current" fill="#2196F3" radius={[4, 4, 0, 0]} />
                <Bar dataKey="average" fill="#FF9800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#2196F3]"></div>
                <span className="text-xs text-muted-foreground">Your usage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF9800]"></div>
                <span className="text-xs text-muted-foreground">Similar households</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UsageComparison;
