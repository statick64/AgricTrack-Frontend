import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Plus, Eye, Edit, Trash2, Filter } from 'lucide-react';
// Mock Data
const mockLivestock = [
{
  id: 1,
  tag: 'CW-2023-01',
  name: 'Bessie',
  type: 'Cattle',
  breed: 'Tswana',
  age: '2 yrs',
  weight: '450kg',
  status: 'Healthy'
},
{
  id: 2,
  tag: 'CW-2023-02',
  name: 'Spot',
  type: 'Cattle',
  breed: 'Brahman',
  age: '3 yrs',
  weight: '520kg',
  status: 'Sick'
},
{
  id: 3,
  tag: 'GT-2023-05',
  name: 'Billy',
  type: 'Goat',
  breed: 'Boer',
  age: '1 yr',
  weight: '45kg',
  status: 'Healthy'
},
{
  id: 4,
  tag: 'SH-2023-12',
  name: 'Wooly',
  type: 'Sheep',
  breed: 'Dorper',
  age: '6 mos',
  weight: '30kg',
  status: 'Healthy'
},
{
  id: 5,
  tag: 'CW-2022-55',
  name: 'Big Red',
  type: 'Cattle',
  breed: 'Tswana',
  age: '4 yrs',
  weight: '600kg',
  status: 'Healthy'
},
{
  id: 6,
  tag: 'GT-2023-08',
  name: 'Nanny',
  type: 'Goat',
  breed: 'Kalahari Red',
  age: '2 yrs',
  weight: '50kg',
  status: 'Pregnant'
},
{
  id: 7,
  tag: 'SH-2023-15',
  name: 'Cloud',
  type: 'Sheep',
  breed: 'Dorper',
  age: '1 yr',
  weight: '40kg',
  status: 'Healthy'
},
{
  id: 8,
  tag: 'CW-2023-10',
  name: 'Thunder',
  type: 'Cattle',
  breed: 'Brahman',
  age: '18 mos',
  weight: '380kg',
  status: 'Healthy'
}];

export function LivestockPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const columns = [
  {
    header: 'Tag ID',
    accessor: 'tag' as const,
    className: 'font-medium'
  },
  {
    header: 'Name',
    accessor: 'name' as const
  },
  {
    header: 'Type',
    accessor: 'type' as const
  },
  {
    header: 'Breed',
    accessor: 'breed' as const
  },
  {
    header: 'Age',
    accessor: 'age' as const
  },
  {
    header: 'Status',
    accessor: (item: any) =>
    <Badge
      variant={
      item.status === 'Healthy' ?
      'success' :
      item.status === 'Sick' ?
      'danger' :
      item.status === 'Pregnant' ?
      'info' :
      'neutral'
      }>

          {item.status}
        </Badge>

  }];

  const filteredData =
  filterType === 'All' ?
  mockLivestock :
  mockLivestock.filter((item) => item.type === filterType);
  return (
    <DashboardLayout title="Livestock Management">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {['All', 'Cattle', 'Goat', 'Sheep'].map((type) =>
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterType === type ? 'bg-primary text-white' : 'bg-white text-text-secondary hover:bg-gray-50 border border-gray-200'}`}>

              {type}
            </button>
          )}
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus size={18} />}>

          Add Livestock
        </Button>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        searchPlaceholder="Search by tag, name, or breed..."
        actions={(item) =>
        <div className="flex justify-end gap-2">
            <button className="p-1 text-gray-400 hover:text-primary transition-colors">
              <Eye size={18} />
            </button>
            <button className="p-1 text-gray-400 hover:text-accent transition-colors">
              <Edit size={18} />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        } />


      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Livestock"
        actions={
        <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddModalOpen(false)}>
              Save Animal
            </Button>
          </>
        }>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Tag ID" placeholder="e.g. CW-2024-01" />
          <Input label="Name" placeholder="e.g. Bessie" />
          <Select
            label="Type"
            options={[
            {
              value: 'cattle',
              label: 'Cattle'
            },
            {
              value: 'goat',
              label: 'Goat'
            },
            {
              value: 'sheep',
              label: 'Sheep'
            },
            {
              value: 'poultry',
              label: 'Poultry'
            }]
            } />

          <Input label="Breed" placeholder="e.g. Tswana" />
          <Input label="Date of Birth" type="date" />
          <Select
            label="Gender"
            options={[
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            }]
            } />

          <Input label="Weight (kg)" type="number" placeholder="0" />
          <Select
            label="Status"
            options={[
            {
              value: 'healthy',
              label: 'Healthy'
            },
            {
              value: 'sick',
              label: 'Sick'
            },
            {
              value: 'pregnant',
              label: 'Pregnant'
            },
            {
              value: 'quarantine',
              label: 'Quarantine'
            }]
            } />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Notes
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              rows={3}
              placeholder="Any additional details...">
            </textarea>
          </div>
        </div>
      </Modal>
    </DashboardLayout>);

}