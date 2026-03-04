
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, AlertTriangle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { inventoryService } from '../services/inventoryService';

export function InventoryPage() {
  const { data: inventoryData, isLoading, error } = useApi(
    () => inventoryService.getAll(),
    []
  );

  const { data: lowStockAlerts } = useApi(
    () => inventoryService.getLowStockAlerts(),
    []
  );

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

  const lowStockCount = lowStockAlerts?.count ?? 0;

  return (
    <DashboardLayout title="Inventory Management">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {lowStockCount > 0 && (
            <div className="bg-orange-50 text-orange-800 px-4 py-2 rounded-lg border border-orange-100 flex items-center gap-2 text-sm font-medium">
              <AlertTriangle size={16} />
              {lowStockCount} Item{lowStockCount !== 1 ? 's' : ''} Low on Stock
            </div>
          )}
        </div>
        <Button icon={<Plus size={18} />}>Add Item</Button>
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
          actions={() => (
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          )}
        />
      )}
    </DashboardLayout>
  );
}