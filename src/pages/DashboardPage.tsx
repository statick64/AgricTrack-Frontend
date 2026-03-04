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
  Calendar,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../hooks/useApi';
import { livestockService } from '../services/livestockService';
import { healthService } from '../services/healthService';
import { inventoryService } from '../services/inventoryService';

export function DashboardPage() {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading } = useApi(
    () => livestockService.getStats(),
    []
  );

  const { data: upcomingVax, isLoading: vaxLoading } = useApi(
    () => healthService.getUpcomingVaccinations(),
    []
  );

  const { data: lowStock, isLoading: stockLoading } = useApi(
    () => inventoryService.getLowStockAlerts(),
    []
  );

  const { data: healthRecords } = useApi(
    () => healthService.getHealthRecords(),
    []
  );

  const totalLivestock = stats?.total ?? 0;
  const upcomingVaxCount = upcomingVax?.length ?? 0;
  const lowStockCount = lowStock?.count ?? 0;
  const healthIssueCount = healthRecords
    ? healthRecords.filter((r) => r.status === 'ongoing').length
    : 0;

  // Build breakdown stats from API data
  const getTypeCount = (type: string) =>
    stats?.by_type?.find((t) => t.animal_type === type)?.count ?? 0;

  const firstName = user?.first_name || 'Farmer';

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">
          Good morning, {firstName}
        </h2>
        <p className="text-text-secondary">
          Here's what's happening on your farm today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Livestock"
          value={statsLoading ? '...' : String(totalLivestock)}
          icon={<Beef size={24} />}
          trend="up"
          trendValue="All time"
          color="primary" />

        <StatCard
          label="Upcoming Vax"
          value={vaxLoading ? '...' : String(upcomingVaxCount)}
          icon={<Syringe size={24} />}
          trend="neutral"
          trendValue="Due in 7 days"
          color="blue" />

        <StatCard
          label="Low Stock Alerts"
          value={stockLoading ? '...' : String(lowStockCount)}
          icon={<Package size={24} />}
          trend={lowStockCount > 0 ? 'down' : 'up'}
          trendValue={lowStockCount > 0 ? 'Needs attention' : 'All stocked'}
          color="accent" />

        <StatCard
          label="Health Issues"
          value={String(healthIssueCount)}
          icon={<Activity size={24} />}
          trend={healthIssueCount > 0 ? 'down' : 'up'}
          trendValue={healthIssueCount > 0 ? 'Ongoing cases' : 'All clear'}
          color="red" />
      </div>

      {/* Breakdown Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
          <div className="text-2xl font-bold text-green-800">
            {statsLoading ? '...' : getTypeCount('cattle')}
          </div>
          <div className="text-sm text-green-600 font-medium">Cattle</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
          <div className="text-2xl font-bold text-orange-800">
            {statsLoading ? '...' : getTypeCount('goat')}
          </div>
          <div className="text-sm text-orange-600 font-medium">Goats</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
          <div className="text-2xl font-bold text-blue-800">
            {statsLoading ? '...' : getTypeCount('sheep')}
          </div>
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
              {vaxLoading ? (
                <div className="text-center py-8 text-text-secondary">Loading vaccinations...</div>
              ) : upcomingVax && upcomingVax.length > 0 ? (
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
                    {upcomingVax.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 font-medium">
                          {item.group_name || `Animal #${item.animal}`}
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          {item.vaccine_name}
                        </td>
                        <td className="px-4 py-3 text-text-secondary flex items-center gap-1">
                          <Calendar size={14} />
                          {item.scheduled_date}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="warning">Pending</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-text-secondary">
                  No upcoming vaccinations
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Low Stock Alerts */}
          <Card>
            <h3 className="font-bold text-lg mb-4">Low Stock Alerts</h3>
            {stockLoading ? (
              <div className="text-center py-4 text-text-secondary">Loading...</div>
            ) : lowStock && lowStock.items.length > 0 ? (
              <div className="space-y-4">
                {lowStock.items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {item.item_name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {item.quantity} {item.unit} remaining (min: {item.min_stock_level})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-text-secondary">
                All stock levels are healthy
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}