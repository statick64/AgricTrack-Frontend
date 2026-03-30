import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Plus, Syringe, Stethoscope, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { healthService } from '../services/healthService';
import { livestockService } from '../services/livestockService';
import type { HealthRecordCreate, VaccinationCreate, Livestock } from '../types';

// ── Animal Lookup Card ──────────────────────────────────────────────────
// Shows a preview of the matched animal so the farmer can confirm it's correct.
function AnimalPreviewCard({ animal, isSearching }: { animal: Livestock | null; isSearching: boolean }) {
  if (isSearching) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3 animate-pulse">
        <Search size={18} className="text-gray-400" />
        <span className="text-sm text-text-secondary">Looking up animal...</span>
      </div>
    );
  }

  if (!animal) return null;

  const statusColors: Record<string, string> = {
    healthy: 'text-green-700 bg-green-50 border-green-200',
    sick: 'text-red-700 bg-red-50 border-red-200',
    pregnant: 'text-blue-700 bg-blue-50 border-blue-200',
    quarantine: 'text-orange-700 bg-orange-50 border-orange-200',
  };

  return (
    <div className={`border rounded-xl p-4 ${statusColors[animal.status] || 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <CheckCircle size={20} className="text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-text-primary">{animal.tag_id}</span>
            {animal.name && (
              <span className="text-text-secondary">— {animal.name}</span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-sm">
            <div>
              <span className="text-text-muted">Type: </span>
              <span className="font-medium capitalize">{animal.animal_type}</span>
            </div>
            <div>
              <span className="text-text-muted">Breed: </span>
              <span className="font-medium">{animal.breed}</span>
            </div>
            <div>
              <span className="text-text-muted">Gender: </span>
              <span className="font-medium capitalize">{animal.gender}</span>
            </div>
            <div>
              <span className="text-text-muted">Weight: </span>
              <span className="font-medium">{animal.weight} kg</span>
            </div>
            <div>
              <span className="text-text-muted">Age: </span>
              <span className="font-medium">{animal.age} {animal.age === 1 ? 'yr' : 'yrs'}</span>
            </div>
            <div>
              <span className="text-text-muted">Status: </span>
              <span className="font-medium capitalize">{animal.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagNotFoundCard({ tagId }: { tagId: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
      <AlertCircle size={20} className="text-red-500 shrink-0" />
      <span className="text-sm text-red-700">
        No animal found with tag <strong>"{tagId}"</strong>. Please check the tag ID and try again.
      </span>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────
export function HealthPage() {
  const [activeTab, setActiveTab] = useState<'health' | 'vaccination'>('health');
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isVaxModalOpen, setIsVaxModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Animal tag lookup state
  const [healthTagInput, setHealthTagInput] = useState('');
  const [healthMatchedAnimal, setHealthMatchedAnimal] = useState<Livestock | null>(null);
  const [healthTagNotFound, setHealthTagNotFound] = useState(false);

  const [vaxTagInput, setVaxTagInput] = useState('');
  const [vaxMatchedAnimal, setVaxMatchedAnimal] = useState<Livestock | null>(null);
  const [vaxTagNotFound, setVaxTagNotFound] = useState(false);

  // Health record form state (animal will be resolved from tag lookup)
  const [healthForm, setHealthForm] = useState({
    date: '',
    condition: '',
    treatment: '',
    veterinarian: '',
    status: 'ongoing' as const,
    notes: '',
    follow_up_date: '',
  });

  // Vaccination form state
  const [vaxForm, setVaxForm] = useState<VaccinationCreate>({
    animal_id: undefined,
    group_name: '',
    vaccine_name: '',
    scheduled_date: '',
    administered_date: '',
    administered_by: '',
    status: 'pending',
    batch_number: '',
    notes: '',
  });

  // Fetch all livestock for tag_id lookup
  const { data: allLivestock } = useApi(() => livestockService.getAll(), []);

  const { data: healthRecords, isLoading: healthLoading, error: healthError, refetch: refetchHealth } = useApi(
    () => healthService.getHealthRecords(),
    []
  );

  const { data: vaccinationRecords, isLoading: vaxLoading, error: vaxError, refetch: refetchVax } = useApi(
    () => healthService.getVaccinations(),
    []
  );

  // Build a tag_id → Livestock lookup map
  const livestockByTag = new Map<string, Livestock>();
  (allLivestock ?? []).forEach((animal) => {
    livestockByTag.set(animal.tag_id.toLowerCase(), animal);
  });

  // ── Tag lookup helpers ──
  const lookupAnimalByTag = (tagId: string): Livestock | null => {
    if (!tagId.trim()) return null;
    return livestockByTag.get(tagId.trim().toLowerCase()) ?? null;
  };

  const handleHealthTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHealthTagInput(value);
    if (!value.trim()) {
      setHealthMatchedAnimal(null);
      setHealthTagNotFound(false);
      return;
    }
    const found = lookupAnimalByTag(value);
    setHealthMatchedAnimal(found);
    setHealthTagNotFound(!found && value.trim().length >= 3);
  };

  const handleVaxTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVaxTagInput(value);
    if (!value.trim()) {
      setVaxMatchedAnimal(null);
      setVaxTagNotFound(false);
      return;
    }
    const found = lookupAnimalByTag(value);
    setVaxMatchedAnimal(found);
    setVaxTagNotFound(!found && value.trim().length >= 3);
  };

  // ── Health Record handlers ──
  const handleHealthChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setHealthForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetHealthForm = () => {
    setHealthForm({ date: '', condition: '', treatment: '', veterinarian: '', status: 'ongoing', notes: '', follow_up_date: '' });
    setHealthTagInput('');
    setHealthMatchedAnimal(null);
    setHealthTagNotFound(false);
    setSaveError(null);
  };

  const handleSaveHealthRecord = async () => {
    setSaveError(null);
    if (!healthMatchedAnimal) {
      setSaveError('Please enter a valid animal Tag ID. The animal must be registered in your livestock.');
      return;
    }
    if (!healthForm.date || !healthForm.condition || !healthForm.treatment || !healthForm.veterinarian) {
      setSaveError('Please fill in all required fields.');
      return;
    }
    setIsSaving(true);
    try {
      const payload: HealthRecordCreate = {
        animal_id: healthMatchedAnimal.id,
        date: healthForm.date,
        condition: healthForm.condition,
        treatment: healthForm.treatment,
        veterinarian: healthForm.veterinarian,
        status: healthForm.status,
        notes: healthForm.notes || undefined,
        follow_up_date: healthForm.follow_up_date || null,
      };
      await healthService.createHealthRecord(payload);
      setIsHealthModalOpen(false);
      resetHealthForm();
      refetchHealth();
    } catch (err: any) {
      const data = err.response?.data;
      const message = typeof data === 'string' ? data : data?.error || data?.detail || data?.message || JSON.stringify(data) || 'Failed to save health record.';
      setSaveError(message);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Vaccination handlers ──
  const handleVaxChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setVaxForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetVaxForm = () => {
    setVaxForm({ animal_id: undefined, group_name: '', vaccine_name: '', scheduled_date: '', administered_date: '', administered_by: '', status: 'pending', batch_number: '', notes: '' });
    setVaxTagInput('');
    setVaxMatchedAnimal(null);
    setVaxTagNotFound(false);
    setSaveError(null);
  };

  const handleSaveVaccination = async () => {
    setSaveError(null);
    if (!vaxForm.vaccine_name || !vaxForm.scheduled_date) {
      setSaveError('Please fill in vaccine name and scheduled date.');
      return;
    }
    if (!vaxMatchedAnimal && !vaxForm.group_name) {
      setSaveError('Please specify either an Animal Tag ID or a Group Name.');
      return;
    }
    if (vaxTagInput.trim() && !vaxMatchedAnimal) {
      setSaveError('The entered Tag ID does not match any registered animal.');
      return;
    }
    setIsSaving(true);
    try {
      const payload: VaccinationCreate = {
        ...vaxForm,
        animal_id: vaxMatchedAnimal?.id ?? undefined,
        group_name: vaxForm.group_name || undefined,
        administered_date: vaxForm.administered_date || undefined,
        administered_by: vaxForm.administered_by || undefined,
        batch_number: vaxForm.batch_number || undefined,
        notes: vaxForm.notes || undefined,
      };
      await healthService.createVaccination(payload);
      setIsVaxModalOpen(false);
      resetVaxForm();
      refetchVax();
    } catch (err: any) {
      const data = err.response?.data;
      const message = typeof data === 'string' ? data : data?.error || data?.detail || data?.message || JSON.stringify(data) || 'Failed to schedule vaccination.';
      setSaveError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddButtonClick = () => {
    if (activeTab === 'health') {
      resetHealthForm();
      setIsHealthModalOpen(true);
    } else {
      resetVaxForm();
      setIsVaxModalOpen(true);
    }
  };

  // ── Table columns ──
  // Resolve tag_id for display in tables using the lookup map
  const getAnimalDisplay = (animalId: string) => {
    const animal = (allLivestock ?? []).find((a) => a.id === animalId);
    return animal ? `${animal.tag_id}${animal.name ? ` (${animal.name})` : ''}` : `ID: ${animalId}`;
  };

  const healthColumns = [
    { header: 'Date', accessor: 'date' as const },
    {
      header: 'Animal',
      accessor: (item: any) => getAnimalDisplay(item.animal_id),
      className: 'font-medium',
    },
    { header: 'Condition', accessor: 'condition' as const },
    { header: 'Treatment', accessor: 'treatment' as const },
    { header: 'Vet', accessor: 'veterinarian' as const },
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
      accessor: (item: any) => item.group_name || getAnimalDisplay(item.animal_id),
      className: 'font-medium',
    },
    { header: 'Vaccine', accessor: 'vaccine_name' as const },
    { header: 'Scheduled Date', accessor: 'scheduled_date' as const },
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
  const pageError = activeTab === 'health' ? healthError : vaxError;

  return (
    <DashboardLayout title="Health & Vaccination">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex">
          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'health'
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
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'vaccination'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}>
            <div className="flex items-center gap-2">
              <Syringe size={16} />
              Vaccinations
            </div>
          </button>
        </div>

        <Button icon={<Plus size={18} />} onClick={handleAddButtonClick}>
          {activeTab === 'health' ? 'Add Health Record' : 'Schedule Vaccination'}
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-text-secondary">Loading records...</div>
      ) : pageError ? (
        <div className="text-center py-12 text-red-600">{pageError}</div>
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

      {/* ===== Add Health Record Modal ===== */}
      <Modal
        isOpen={isHealthModalOpen}
        onClose={() => { setIsHealthModalOpen(false); setSaveError(null); }}
        title="Add Health Record"
        maxWidth="lg"
        actions={
          <>
            <Button variant="ghost" onClick={() => { setIsHealthModalOpen(false); setSaveError(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSaveHealthRecord} isLoading={isSaving} disabled={!healthMatchedAnimal}>
              Save Record
            </Button>
          </>
        }>
        <div className="space-y-4">
          {saveError && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-100">
              {saveError}
            </div>
          )}

          {/* Tag ID lookup */}
          <div>
            <Input
              label="Animal Tag ID *"
              placeholder="e.g. CW-2023-01"
              value={healthTagInput}
              onChange={handleHealthTagChange}
              icon={<Search size={18} />}
            />
            <p className="text-xs text-text-muted mt-1">
              Enter the tag ID of the animal. The animal details will appear below for confirmation.
            </p>
          </div>

          {/* Animal preview */}
          {healthMatchedAnimal && <AnimalPreviewCard animal={healthMatchedAnimal} isSearching={false} />}
          {healthTagNotFound && <TagNotFoundCard tagId={healthTagInput} />}

          {/* Remaining form fields — only show after animal is confirmed */}
          {healthMatchedAnimal && (
            <>
              <hr className="border-gray-100" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date *"
                  type="date"
                  value={healthForm.date}
                  onChange={handleHealthChange('date')}
                />
                <Input
                  label="Condition *"
                  placeholder="e.g. Lumpy Skin Disease"
                  value={healthForm.condition}
                  onChange={handleHealthChange('condition')}
                />
                <Input
                  label="Treatment *"
                  placeholder="e.g. Antibiotics"
                  value={healthForm.treatment}
                  onChange={handleHealthChange('treatment')}
                />
                <Input
                  label="Veterinarian *"
                  placeholder="e.g. Dr. Molefe"
                  value={healthForm.veterinarian}
                  onChange={handleHealthChange('veterinarian')}
                />
                <Select
                  label="Status *"
                  value={healthForm.status}
                  onChange={handleHealthChange('status')}
                  options={[
                    { value: 'ongoing', label: 'Ongoing' },
                    { value: 'recovered', label: 'Recovered' },
                    { value: 'healthy', label: 'Healthy' },
                  ]}
                />
                <Input
                  label="Follow-up Date"
                  type="date"
                  value={healthForm.follow_up_date || ''}
                  onChange={handleHealthChange('follow_up_date')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Notes
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  rows={3}
                  placeholder="Any additional notes..."
                  value={healthForm.notes || ''}
                  onChange={handleHealthChange('notes')}
                />
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* ===== Schedule Vaccination Modal ===== */}
      <Modal
        isOpen={isVaxModalOpen}
        onClose={() => { setIsVaxModalOpen(false); setSaveError(null); }}
        title="Schedule Vaccination"
        maxWidth="lg"
        actions={
          <>
            <Button variant="ghost" onClick={() => { setIsVaxModalOpen(false); setSaveError(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSaveVaccination} isLoading={isSaving}>
              Schedule Vaccination
            </Button>
          </>
        }>
        <div className="space-y-4">
          {saveError && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-100">
              {saveError}
            </div>
          )}

          <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm border border-blue-100">
            For an <strong>individual</strong> vaccination, enter the animal's <strong>Tag ID</strong> below.
            For a <strong>herd/group</strong> vaccination, enter a <strong>Group Name</strong> instead.
          </div>

          {/* Tag ID or Group Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Animal Tag ID"
                placeholder="e.g. CW-2023-01"
                value={vaxTagInput}
                onChange={handleVaxTagChange}
                icon={<Search size={18} />}
              />
              <p className="text-xs text-text-muted mt-1">For individual animal vaccination</p>
            </div>
            <div>
              <Input
                label="Group Name"
                placeholder="e.g. Herd A (Cattle)"
                value={vaxForm.group_name || ''}
                onChange={handleVaxChange('group_name')}
              />
              <p className="text-xs text-text-muted mt-1">For herd/group vaccination</p>
            </div>
          </div>

          {/* Animal preview */}
          {vaxMatchedAnimal && <AnimalPreviewCard animal={vaxMatchedAnimal} isSearching={false} />}
          {vaxTagNotFound && <TagNotFoundCard tagId={vaxTagInput} />}

          <hr className="border-gray-100" />

          {/* Vaccination details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Vaccine Name *"
              placeholder="e.g. Anthrax"
              value={vaxForm.vaccine_name}
              onChange={handleVaxChange('vaccine_name')}
            />
            <Input
              label="Scheduled Date *"
              type="date"
              value={vaxForm.scheduled_date}
              onChange={handleVaxChange('scheduled_date')}
            />
            <Select
              label="Status"
              value={vaxForm.status || 'pending'}
              onChange={handleVaxChange('status')}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' },
                { value: 'overdue', label: 'Overdue' },
              ]}
            />
            <Input
              label="Batch Number"
              placeholder="e.g. VAX-2024-001"
              value={vaxForm.batch_number || ''}
              onChange={handleVaxChange('batch_number')}
            />
            <Input
              label="Administered Date"
              type="date"
              value={vaxForm.administered_date || ''}
              onChange={handleVaxChange('administered_date')}
            />
            <Input
              label="Administered By"
              placeholder="e.g. Dr. Molefe"
              value={vaxForm.administered_by || ''}
              onChange={handleVaxChange('administered_by')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Notes
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              rows={3}
              placeholder="Any additional notes..."
              value={vaxForm.notes || ''}
              onChange={handleVaxChange('notes')}
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}