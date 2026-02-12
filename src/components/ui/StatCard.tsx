import React from 'react';
import { Card } from './Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'primary' | 'accent' | 'blue' | 'red';
}
export function StatCard({
  label,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary'
}: StatCardProps) {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600'
  };
  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
        {trend &&
        <div
          className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>

            {trend === 'up' && <ArrowUpRight className="w-4 h-4 mr-1" />}
            {trend === 'down' && <ArrowDownRight className="w-4 h-4 mr-1" />}
            {trend === 'neutral' && <Minus className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        }
      </div>
      <div>
        <p className="text-sm font-medium text-text-secondary mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
      </div>
    </Card>);

}