import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, Syringe, Stethoscope } from 'lucide-react';
// Mock Data
const healthRecords = [
{
  id: 1,
  date: '2023-10-01',
  animal: 'CW-2023-02 (Spot)',
  condition: 'Lumpy Skin Disease',
  treatment: 'Antibiotics',
  vet: 'Dr. Molefe',
  status: 'Ongoing'
},
{
  id: 2,
  date: '2023-09-28',
  animal: 'GT-2023-05 (Billy)',
  condition: 'Hoof Infection',
  treatment: 'Cleaning & Bandage',
  vet: 'Dr. Molefe',
  status: 'Recovered'
},
{
  id: 3,
  date: '2023-09-15',
  animal: 'CW-2023-01 (Bessie)',
  condition: 'Routine Checkup',
  treatment: 'None',
  vet: 'Dr. Smith',
  status: 'Healthy'
}];

const vaccinationRecords = [
{
  id: 1,
  animal: 'Herd A (Cattle)',
  vaccine: 'Anthrax',
  date: '2023-10-15',
  status: 'Pending',
  admin: '-'
},
{
  id: 2,
  animal: 'Herd B (Cattle)',
  vaccine: 'FMD',
  date: '2023-09-10',
  status: 'Completed',
  admin: 'Dr. Molefe'
},
{
  id: 3,
  animal: 'All Goats',
  vaccine: 'Pasteurella',
  date: '2023-08-20',
  status: 'Overdue',
  admin: '-'
},
{
  id: 4,
  animal: 'Sheep Group 1',
  vaccine: 'Blue Tongue',
  date: '2023-10-18',
  status: 'Pending',
  admin: '-'
}];

export function HealthPage() {
  const [activeTab, setActiveTab] = useState<'health' | 'vaccination'>('health');
  const healthColumns = [
  {
    header: 'Date',
    accessor: 'date' as const
  },
  {
    header: 'Animal',
    accessor: 'animal' as const,
    className: 'font-medium'
  },
  {
    header: 'Condition',
    accessor: 'condition' as const
  },
  {
    header: 'Treatment',
    accessor: 'treatment' as const
  },
  {
    header: 'Vet',
    accessor: 'vet' as const
  },
  {
    header: 'Status',
    accessor: (item: any) =>
    <Badge
      variant={
      item.status === 'Recovered' || item.status === 'Healthy' ?
      'success' :
      item.status === 'Ongoing' ?
      'warning' :
      'danger'
      }>

          {item.status}
        </Badge>

  }];

  const vaxColumns = [
  {
    header: 'Animal/Group',
    accessor: 'animal' as const,
    className: 'font-medium'
  },
  {
    header: 'Vaccine',
    accessor: 'vaccine' as const
  },
  {
    header: 'Scheduled Date',
    accessor: 'date' as const
  },
  {
    header: 'Status',
    accessor: (item: any) =>
    <Badge
      variant={
      item.status === 'Completed' ?
      'success' :
      item.status === 'Pending' ?
      'warning' :
      'danger'
      }>

          {item.status}
        </Badge>

  },
  {
    header: 'Administered By',
    accessor: 'admin' as const
  }];

  return (
    <DashboardLayout title="Health & Vaccination">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex">
          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'health' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>

            <div className="flex items-center gap-2">
              <Stethoscope size={16} />
              Health Records
            </div>
          </button>
          <button
            onClick={() => setActiveTab('vaccination')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'vaccination' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>

            <div className="flex items-center gap-2">
              <Syringe size={16} />
              Vaccinations
            </div>
          </button>
        </div>

        <Button icon={<Plus size={18} />}>
          {activeTab === 'health' ?
          'Add Health Record' :
          'Schedule Vaccination'}
        </Button>
      </div>

      {activeTab === 'health' ?
      <DataTable
        data={healthRecords}
        columns={healthColumns}
        searchPlaceholder="Search health records..." /> :


      <DataTable
        data={vaccinationRecords}
        columns={vaxColumns}
        searchPlaceholder="Search vaccination schedule..." />

      }
    </DashboardLayout>);

}