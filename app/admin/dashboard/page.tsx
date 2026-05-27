import { Users, MousePointerClick, Clock, Eye } from "lucide-react";
import { StatsCard } from "../components/StatsCard";
import { VisitsChart } from "../components/VisitsChart";

export const metadata = {
  title: "Dashboard | Admin",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-zinc-400 mt-1">Track your website performance and user engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Visitors Today" 
          value="1,204" 
          icon={Users} 
          trend={{ value: 12.5, label: "vs last week" }}
          description="from previous day"
        />
        <StatsCard 
          title="Total Visits" 
          value="45,231" 
          icon={Eye} 
          trend={{ value: 8.2, label: "vs last month" }}
          description="this month"
        />
        <StatsCard 
          title="Avg. Time on Page" 
          value="2m 45s" 
          icon={Clock} 
          trend={{ value: -2.4, label: "vs last month" }}
          description="across all sections"
        />
        <StatsCard 
          title="Top Clicked Asset" 
          value="Product 1" 
          icon={MousePointerClick} 
          description="32% of all interactions"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <VisitsChart />
        {/* We can add another card here for Recent Activity or similar */}
      </div>
    </div>
  );
}
