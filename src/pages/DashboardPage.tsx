import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Beef,
  Syringe,
  AlertTriangle,
  Activity,
  Plus,
  FileText,
  Package,
  Calendar } from
'lucide-react';
export function DashboardPage() {
  const recentActivity = [
  {
    id: 1,
    action: 'Added new calf',
    detail: 'Tag #CW-2024-05',
    time: '2 hours ago',
    icon: <Plus size={16} />
  },
  {
    id: 2,
    action: 'Vaccination completed',
    detail: 'Anthrax Booster for Herd A',
    time: '5 hours ago',
    icon: <Syringe size={16} />
  },
  {
    id: 3,
    action: 'Inventory alert',
    detail: 'Cattle Feed running low',
    time: '1 day ago',
    icon: <AlertTriangle size={16} />
  },
  {
    id: 4,
    action: 'Health record updated',
    detail: 'Goat #GT-102 treated for injury',
    time: '1 day ago',
    icon: <Activity size={16} />
  },
  {
    id: 5,
    action: 'Report generated',
    detail: 'Monthly Livestock Summary',
    time: '2 days ago',
    icon: <FileText size={16} />
  }];

  const upcomingVax = [
  {
    id: 1,
    animal: 'Herd B (Cattle)',
    vaccine: 'Lumpy Skin Disease',
    date: 'Oct 15, 2023',
    status: 'pending'
  },
  {
    id: 2,
    animal: 'Sheep Group 1',
    vaccine: 'Blue Tongue',
    date: 'Oct 18, 2023',
    status: 'pending'
  },
  {
    id: 3,
    animal: 'Goat #GT-055',
    vaccine: 'Pasteurella',
    date: 'Oct 20, 2023',
    status: 'pending'
  }];

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">
          Good morning, Thabo
        </h2>
        <p className="text-text-secondary">
          Here's what's happening on your farm today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Livestock"
          value="247"
          icon={<Beef size={24} />}
          trend="up"
          trendValue="+12 this month"
          color="primary" />

        <StatCard
          label="Upcoming Vax"
          value="12"
          icon={<Syringe size={24} />}
          trend="neutral"
          trendValue="Due in 7 days"
          color="blue" />

        <StatCard
          label="Low Stock Alerts"
          value="3"
          icon={<Package size={24} />}
          trend="down"
          trendValue="Needs attention"
          color="accent" />

        <StatCard
          label="Health Issues"
          value="2"
          icon={<Activity size={24} />}
          trend="down"
          trendValue="-1 from last week"
          color="red" />

      </div>

      {/* Breakdown Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
          <div className="text-2xl font-bold text-green-800">180</div>
          <div className="text-sm text-green-600 font-medium">Cattle</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
          <div className="text-2xl font-bold text-orange-800">42</div>
          <div className="text-sm text-orange-600 font-medium">Goats</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
          <div className="text-2xl font-bold text-blue-800">25</div>
          <div className="text-sm text-blue-600 font-medium">Sheep</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <Card>
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 border-dashed">

                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Plus size={20} />
                </div>
                <span className="text-sm">Add Livestock</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 border-dashed">

                <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                  <Syringe size={20} />
                </div>
                <span className="text-sm">Record Vax</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 border-dashed">

                <div className="bg-orange-50 p-2 rounded-full text-orange-600">
                  <Package size={20} />
                </div>
                <span className="text-sm">Inventory</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 border-dashed">

                <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                  <FileText size={20} />
                </div>
                <span className="text-sm">Report</span>
              </Button>
            </div>
          </Card>

          {/* Upcoming Vaccinations */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Upcoming Vaccinations</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-text-secondary">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Animal/Group</th>
                    <th className="px-4 py-3">Vaccine</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {upcomingVax.map((item) =>
                  <tr key={item.id}>
                      <td className="px-4 py-3 font-medium">{item.animal}</td>
                      <td className="px-4 py-3 text-text-secondary">
                        {item.vaccine}
                      </td>
                      <td className="px-4 py-3 text-text-secondary flex items-center gap-1">
                        <Calendar size={14} />
                        {item.date}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="warning">Pending</Badge>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <Card>
            <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-6">
              {recentActivity.map((item, idx) =>
              <div key={item.id} className="flex gap-3 relative">
                  {idx !== recentActivity.length - 1 &&
                <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-gray-100"></div>
                }
                  <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-text-secondary shrink-0 z-10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {item.action}
                    </p>
                    <p className="text-xs text-text-secondary mb-1">
                      {item.detail}
                    </p>
                    <p className="text-xs text-text-muted">{item.time}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>);

}