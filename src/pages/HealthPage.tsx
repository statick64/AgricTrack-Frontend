import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, Syringe, Stethoscope } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { healthService } from '../services/healthService';

export function HealthPage() {
  const [activeTab, setActiveTab] = useState<'health' | 'vaccination'>('health');

  const { data: healthRecords, isLoading: healthLoading, error: healthError } = useApi(
    () => healthService.getHealthRecords(),
    []
  );

  const { data: vaccinationRecords, isLoading: vaxLoading, error: vaxError } = useApi(
    () => healthService.getVaccinations(),
    []
  );

  const healthColumns = [
    {
      header: 'Date',
      accessor: 'date' as const,
    },
    {
      header: 'Animal',
      accessor: (item: any) => `Animal #${item.animal}`,
      className: 'font-medium',
    },
    {
      header: 'Condition',
      accessor: 'condition' as const,
    },
    {
      header: 'Treatment',
      accessor: 'treatment' as const,
    },
    {
      header: 'Vet',
      accessor: 'veterinarian' as const,
    },
    {
      header: 'Status',
      accessor: (item: any) => (
        <Badge
          variant={
            item.status === 'recovered' || item.status === 'healthy'
              ? 'success'
              : item.status === 'ongoing'
                ? 'warning'
                : 'danger'
          }>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      ),
    },
  ];

  const vaxColumns = [
    {
      header: 'Animal/Group',
      accessor: (item: any) => item.group_name || `Animal #${item.animal}`,
      className: 'font-medium',
    },
    {
      header: 'Vaccine',
      accessor: 'vaccine_name' as const,
    },
    {
      header: 'Scheduled Date',
      accessor: 'scheduled_date' as const,
    },
    {
      header: 'Status',
      accessor: (item: any) => (
        <Badge
          variant={
            item.status === 'completed'
              ? 'success'
              : item.status === 'pending'
                ? 'warning'
                : 'danger'
          }>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      ),
    },
    {
      header: 'Administered By',
      accessor: (item: any) => item.administered_by || '-',
    },
  ];

  const isLoading = activeTab === 'health' ? healthLoading : vaxLoading;
  const error = activeTab === 'health' ? healthError : vaxError;

  return (
    <DashboardLayout title="Health & Vaccination">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex">
          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'health'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
              }`}>
            <div className="flex items-center gap-2">
              <Stethoscope size={16} />
              Health Records
            </div>
          </button>
          <button
            onClick={() => setActiveTab('vaccination')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'vaccination'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
              }`}>
            <div className="flex items-center gap-2">
              <Syringe size={16} />
              Vaccinations
            </div>
          </button>
        </div>

        <Button icon={<Plus size={18} />}>
          {activeTab === 'health' ? 'Add Health Record' : 'Schedule Vaccination'}
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-text-secondary">Loading records...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : activeTab === 'health' ? (
        <DataTable
          data={healthRecords ?? []}
          columns={healthColumns}
          searchPlaceholder="Search health records..."
        />
      ) : (
        <DataTable
          data={vaccinationRecords ?? []}
          columns={vaxColumns}
          searchPlaceholder="Search vaccination schedule..."
        />
      )}
    </DashboardLayout>
  );
}