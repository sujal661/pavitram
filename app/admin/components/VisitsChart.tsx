"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { date: "Mon", visits: 120 },
  { date: "Tue", visits: 210 },
  { date: "Wed", visits: 180 },
  { date: "Thu", visits: 310 },
  { date: "Fri", visits: 450 },
  { date: "Sat", visits: 380 },
  { date: "Sun", visits: 420 },
];

export function VisitsChart() {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm col-span-1 md:col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Weekly Traffic Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
              <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#f4f4f5", borderRadius: "8px" }}
                itemStyle={{ color: "#f59e0b" }}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#f59e0b" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: "#18181b" }} 
                activeDot={{ r: 6, strokeWidth: 0, fill: "#f59e0b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
