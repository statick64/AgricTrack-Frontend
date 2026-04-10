import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Plus, Eye, Edit, Trash2, QrCode, Download, Printer } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { livestockService } from '../services/livestockService';
import type { Livestock, LivestockCreate } from '../types';

export function LivestockPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [isSaving, setIsSaving] = useState(false);

  // QR Code modal state
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrLivestockInfo, setQrLivestockInfo] = useState<{ tag_id: string; name: string | null } | null>(null);
  const [isLoadingQr, setIsLoadingQr] = useState(false);

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
      const newAnimal = await livestockService.create(formData);
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

      // Automatically generate and show QR code for the new animal
      fetchAndShowQR(newAnimal.id, newAnimal.tag_id, newAnimal.name);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save livestock');
    } finally {
      setIsSaving(false);
    }
  };

  const fetchAndShowQR = async (id: string, tag_id: string, name: string | null) => {
    setIsLoadingQr(true);
    setQrLivestockInfo({ tag_id, name });
    setIsQrModalOpen(true);
    try {
      const url = await livestockService.getQRCode(id);
      setQrCodeUrl(url);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to generate QR code');
      setIsQrModalOpen(false);
    } finally {
      setIsLoadingQr(false);
    }
  };

  const handleViewQR = (animal: Livestock) => {
    fetchAndShowQR(animal.id, animal.tag_id, animal.name);
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl || !qrLivestockInfo) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QR-${qrLivestockInfo.tag_id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintQR = () => {
    if (!qrCodeUrl) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>QR Code - ${qrLivestockInfo?.tag_id}</title></head>
          <body style="display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;flex-direction:column;font-family:sans-serif;">
            <h2 style="margin-bottom:8px;">${qrLivestockInfo?.tag_id}</h2>
            ${qrLivestockInfo?.name ? `<p style="margin:0 0 16px;color:#666;">${qrLivestockInfo.name}</p>` : ''}
            <img src="${qrCodeUrl}" style="width:300px;height:300px;" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = () => { printWindow.print(); };
    }
  };

  const closeQrModal = () => {
    setIsQrModalOpen(false);
    if (qrCodeUrl) {
      URL.revokeObjectURL(qrCodeUrl);
      setQrCodeUrl(null);
    }
    setQrLivestockInfo(null);
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
              <button
                onClick={() => handleViewQR(item)}
                title="View QR Code"
                className="p-1 text-gray-400 hover:text-primary transition-colors">
                <QrCode size={18} />
              </button>
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

      {/* QR Code Modal */}
      <Modal
        isOpen={isQrModalOpen}
        onClose={closeQrModal}
        title="Livestock QR Code"
        maxWidth="sm"
        actions={
          <>
            <Button variant="ghost" onClick={closeQrModal}>
              Close
            </Button>
            <Button
              variant="outline"
              icon={<Printer size={18} />}
              onClick={handlePrintQR}
              disabled={!qrCodeUrl}>
              Print
            </Button>
            <Button
              icon={<Download size={18} />}
              onClick={handleDownloadQR}
              disabled={!qrCodeUrl}>
              Download
            </Button>
          </>
        }>
        <div className="flex flex-col items-center gap-4">
          {qrLivestockInfo && (
            <div className="text-center">
              <p className="text-lg font-semibold text-text-primary">
                {qrLivestockInfo.tag_id}
              </p>
              {qrLivestockInfo.name && (
                <p className="text-sm text-text-secondary">{qrLivestockInfo.name}</p>
              )}
            </div>
          )}
          {isLoadingQr ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-sm text-text-secondary">Generating QR Code...</p>
            </div>
          ) : qrCodeUrl ? (
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <img
                src={qrCodeUrl}
                alt={`QR Code for ${qrLivestockInfo?.tag_id}`}
                className="w-64 h-64 object-contain"
              />
            </div>
          ) : null}
          <p className="text-xs text-text-secondary text-center max-w-[250px]">
            Scan this QR code to view the animal's public details
          </p>
        </div>
      </Modal>
    </DashboardLayout>
  );
}