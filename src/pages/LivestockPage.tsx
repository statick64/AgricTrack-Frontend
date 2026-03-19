import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { livestockService } from '../services/livestockService';
import type { LivestockCreate } from '../types';

export function LivestockPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<LivestockCreate>({
    tag_id: '',
    name: null,
    animal_type: 'cattle',
    breed: '',
    gender: 'male',
    date_of_birth: '',
    weight: 0,
    status: 'healthy',
    notes: null,
  });

  const apiFilterType = filterType === 'All' ? undefined : filterType.toLowerCase();
  const { data: livestock, isLoading, error, refetch } = useApi(
    () => livestockService.getAll(apiFilterType),
    [apiFilterType]
  );

  const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'weight' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await livestockService.create(formData);
      setIsAddModalOpen(false);
      setFormData({
        tag_id: '',
        name: null,
        animal_type: 'cattle',
        breed: '',
        gender: 'male',
        date_of_birth: '',
        weight: 0,
        status: 'healthy',
        notes: null,
      });
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save livestock');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this animal?')) return;
    try {
      await livestockService.delete(id);
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete livestock');
    }
  };

  const columns = [
    {
      header: 'Tag ID',
      accessor: 'tag_id' as const,
      className: 'font-medium',
    },
    {
      header: 'Name',
      accessor: 'name' as const,
    },
    {
      header: 'Type',
      accessor: (item: any) =>
        item.animal_type.charAt(0).toUpperCase() + item.animal_type.slice(1),
    },
    {
      header: 'Breed',
      accessor: 'breed' as const,
    },
    {
      header: 'Age',
      accessor: (item: any) =>
        item.age !== undefined
          ? item.age === 1
            ? '1 yr'
            : `${item.age} yrs`
          : '-',
    },
    {
      header: 'Status',
      accessor: (item: any) => (
        <Badge
          variant={
            item.status === 'healthy'
              ? 'success'
              : item.status === 'sick'
                ? 'danger'
                : item.status === 'pregnant'
                  ? 'info'
                  : 'neutral'
          }>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      ),
    },
  ];

  const displayData = livestock ?? [];

  return (
    <DashboardLayout title="Livestock Management">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {['All', 'Cattle', 'Goat', 'Sheep', 'Poultry'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterType === type
                ? 'bg-primary text-white'
                : 'bg-white text-text-secondary hover:bg-gray-50 border border-gray-200'
                }`}>
              {type}
            </button>
          ))}
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus size={18} />}>
          Add Livestock
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-text-secondary">Loading livestock...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <DataTable
          data={displayData}
          columns={columns}
          searchPlaceholder="Search by tag, name, or breed..."
          actions={(item: any) => (
            <div className="flex justify-end gap-2">
              <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                <Eye size={18} />
              </button>
              <button className="p-1 text-gray-400 hover:text-accent transition-colors">
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          )}
        />
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Livestock"
        actions={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              Save Animal
            </Button>
          </>
        }>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Tag ID"
            placeholder="e.g. CW-2024-01"
            value={formData.tag_id}
            onChange={handleFormChange('tag_id')}
          />
          <Input
            label="Name"
            placeholder="e.g. Bessie"
            value={formData.name || ''}
            onChange={handleFormChange('name')}
          />
          <Select
            label="Type"
            value={formData.animal_type}
            onChange={handleFormChange('animal_type')}
            options={[
              { value: 'cattle', label: 'Cattle' },
              { value: 'goat', label: 'Goat' },
              { value: 'sheep', label: 'Sheep' },
              { value: 'poultry', label: 'Poultry' },
            ]}
          />
          <Input
            label="Breed"
            placeholder="e.g. Tswana"
            value={formData.breed}
            onChange={handleFormChange('breed')}
          />
          <Input
            label="Date of Birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleFormChange('date_of_birth')}
          />
          <Select
            label="Gender"
            value={formData.gender}
            onChange={handleFormChange('gender')}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
          <Input
            label="Weight (kg)"
            type="number"
            placeholder="0"
            value={String(formData.weight)}
            onChange={handleFormChange('weight')}
          />
          <Select
            label="Status"
            value={formData.status || 'healthy'}
            onChange={handleFormChange('status')}
            options={[
              { value: 'healthy', label: 'Healthy' },
              { value: 'sick', label: 'Sick' },
              { value: 'pregnant', label: 'Pregnant' },
              { value: 'quarantine', label: 'Quarantine' },
            ]}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Notes
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              rows={3}
              placeholder="Any additional details..."
              value={formData.notes || ''}
              onChange={handleFormChange('notes')}
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}