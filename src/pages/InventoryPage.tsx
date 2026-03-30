import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Plus, Edit } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { inventoryService } from '../services/inventoryService';
import type { InventoryItem, InventoryItemCreate } from '../types';

export function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Form state matching InventoryItemCreate
  const [formData, setFormData] = useState<InventoryItemCreate>({
    item_name: '',
    category: 'feed',
    quantity: 0,
    unit: '',
    min_stock_level: 0,
    description: '',
    supplier: '',
    cost_per_unit: undefined,
  });

  const { data: inventoryData, isLoading, error, refetch } = useApi(
    () => inventoryService.getAll(),
    []
  );

  const resetForm = () => {
    setFormData({
      item_name: '',
      category: 'feed',
      quantity: 0,
      unit: '',
      min_stock_level: 0,
      description: '',
      supplier: '',
      cost_per_unit: undefined,
    });
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      item_name: item.item_name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      min_stock_level: item.min_stock_level,
      description: item.description || '',
      supplier: item.supplier || '',
      cost_per_unit: item.cost_per_unit ?? undefined,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    resetForm();
  };

  const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: ['quantity', 'min_stock_level', 'cost_per_unit'].includes(field)
        ? e.target.value === '' ? undefined : Number(e.target.value)
        : e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await inventoryService.update(editingItem.id, formData);
      } else {
        await inventoryService.create(formData);
      }
      handleCloseModal();
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.error || (editingItem ? 'Failed to update inventory item' : 'Failed to add inventory item'));
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    {
      header: 'Item Name',
      accessor: 'item_name' as const,
      className: 'font-medium',
    },
    {
      header: 'Category',
      accessor: (item: any) =>
        item.category.charAt(0).toUpperCase() + item.category.slice(1),
    },
    {
      header: 'Quantity',
      accessor: 'quantity' as const,
    },
    {
      header: 'Unit',
      accessor: 'unit' as const,
    },
    {
      header: 'Status',
      accessor: (item: any) => {
        const statusLabel = item.status
          .split('_')
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        return (
          <Badge
            variant={
              item.status === 'in_stock'
                ? 'success'
                : item.status === 'low_stock'
                  ? 'warning'
                  : 'danger'
            }>
            {statusLabel}
          </Badge>
        );
      },
    },
    {
      header: 'Last Updated',
      accessor: (item: any) =>
        item.last_updated
          ? new Date(item.last_updated).toLocaleDateString()
          : '-',
    },
  ];

  return (
    <DashboardLayout title="Inventory Management">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4" />
        <Button
          onClick={handleOpenAdd}
          icon={<Plus size={18} />}>
          Add Item
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-text-secondary">Loading inventory...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <DataTable
          data={inventoryData ?? []}
          columns={columns}
          searchPlaceholder="Search inventory..."
          actions={(item: any) => (
            <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(item)} icon={<Edit size={16} />}>
              Edit
            </Button>
          )}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        actions={
          <>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              {editingItem ? 'Update Item' : 'Save Item'}
            </Button>
          </>
        }>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Item Name"
            placeholder="e.g. Cattle Feed"
            value={formData.item_name}
            onChange={handleFormChange('item_name')}
          />
          <Select
            label="Category"
            value={formData.category}
            onChange={handleFormChange('category')}
            options={[
              { value: 'feed', label: 'Feed' },
              { value: 'medicine', label: 'Medicine' },
              { value: 'equipment', label: 'Equipment' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <Input
            label="Quantity"
            type="number"
            placeholder="0"
            value={String(formData.quantity)}
            onChange={handleFormChange('quantity')}
          />
          <Input
            label="Unit"
            placeholder="e.g. kg, litres, bags"
            value={formData.unit}
            onChange={handleFormChange('unit')}
          />
          <Input
            label="Min Stock Level"
            type="number"
            placeholder="0"
            value={String(formData.min_stock_level)}
            onChange={handleFormChange('min_stock_level')}
          />
          <Input
            label="Cost Per Unit"
            type="number"
            placeholder="0.00"
            value={formData.cost_per_unit !== undefined ? String(formData.cost_per_unit) : ''}
            onChange={handleFormChange('cost_per_unit')}
          />
          <Input
            label="Supplier"
            placeholder="e.g. Farm Supplies Ltd"
            value={formData.supplier || ''}
            onChange={handleFormChange('supplier')}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              rows={3}
              placeholder="Item description..."
              value={formData.description || ''}
              onChange={handleFormChange('description')}
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}