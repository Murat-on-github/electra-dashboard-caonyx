
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from 'recharts';
import { Euro, Leaf, Zap } from "lucide-react";

// Mock carbon impact data
const pieData = [
  { name: 'HVAC', value: 420, color: '#2196F3' },
  { name: 'Appliances', value: 380, color: '#4CAF50' },
  { name: 'Lighting', value: 210, color: '#FF9800' },
  { name: 'Electronics', value: 190, color: '#9C27B0' },
];

const trendData = [
  { month: 'Jan', carbon: 280, cost: 68, energy: 320 },
  { month: 'Feb', carbon: 250, cost: 62, energy: 290 },
  { month: 'Mar', carbon: 300, cost: 72, energy: 340 },
  { month: 'Apr', carbon: 340, cost: 80, energy: 380 },
  { month: 'May', carbon: 320, cost: 76, energy: 360 },
  { month: 'Jun', carbon: 280, cost: 70, energy: 310 },
];

const CarbonImpact = () => {
  const [unit, setUnit] = useState('carbon'); // carbon, cost, energy
  
  const getUnitLabel = () => {
    switch (unit) {
      case 'carbon':
        return 'kg CO₂';
      case 'cost':
        return '€';
      case 'energy':
        return 'kWh';
      default:
        return '';
    }
  };
  
  const getUnitIcon = () => {
    switch (unit) {
      case 'carbon':
        return <Leaf className="h-4 w-4" />;
      case 'cost':
        return <Euro className="h-4 w-4" />;
      case 'energy':
        return <Zap className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getTotalValue = () => {
    switch (unit) {
      case 'carbon':
        return '1,200 kg CO₂';
      case 'cost':
        return '€325';
      case 'energy':
        return '1,400 kWh';
      default:
        return '';
    }
  };
  
  // Calculate total carbon footprint
  const totalCarbon = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Carbon Impact</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total: {getTotalValue()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution" className="mt-0">
            <div className="flex">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={35}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">View By:</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-colors ${unit === 'carbon' ? 'bg-electra-info text-white' : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'}`}
                      onClick={() => setUnit('carbon')}
                    >
                      <Leaf className="h-3.5 w-3.5" />
                      CO₂
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-colors ${unit === 'cost' ? 'bg-electra-accent text-white' : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'}`}
                      onClick={() => setUnit('cost')}
                    >
                      <Euro className="h-3.5 w-3.5" />
                      EUR
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-colors ${unit === 'energy' ? 'bg-electra-success text-white' : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'}`}
                      onClick={() => setUnit('energy')}
                    >
                      <Zap className="h-3.5 w-3.5" />
                      kWh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trend" className="mt-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }} 
                  labelStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey={unit} 
                  stroke={unit === 'carbon' ? '#2196F3' : unit === 'cost' ? '#F44336' : '#4CAF50'} 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-2">
              <div className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ 
                    backgroundColor: unit === 'carbon' ? '#2196F3' : unit === 'cost' ? '#F44336' : '#4CAF50' 
                  }}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {unit === 'carbon' ? 'Carbon Footprint' : unit === 'cost' ? 'Energy Cost' : 'Energy Usage'}
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CarbonImpact;
