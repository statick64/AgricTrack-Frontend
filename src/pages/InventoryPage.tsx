import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, AlertTriangle } from 'lucide-react';
const inventoryData = [
{
  id: 1,
  item: 'Cattle Feed (50kg)',
  category: 'Feed',
  quantity: 12,
  unit: 'Bags',
  minStock: 20,
  status: 'Low Stock',
  lastUpdated: '2023-10-05'
},
{
  id: 2,
  item: 'Alfalfa Hay',
  category: 'Feed',
  quantity: 150,
  unit: 'Bales',
  minStock: 50,
  status: 'In Stock',
  lastUpdated: '2023-10-01'
},
{
  id: 3,
  item: 'FMD Vaccine',
  category: 'Medicine',
  quantity: 5,
  unit: 'Vials',
  minStock: 5,
  status: 'Low Stock',
  lastUpdated: '2023-09-15'
},
{
  id: 4,
  item: 'Antibiotics',
  category: 'Medicine',
  quantity: 20,
  unit: 'Bottles',
  minStock: 10,
  status: 'In Stock',
  lastUpdated: '2023-09-20'
},
{
  id: 5,
  item: 'Fencing Wire',
  category: 'Equipment',
  quantity: 2,
  unit: 'Rolls',
  minStock: 5,
  status: 'Low Stock',
  lastUpdated: '2023-08-10'
},
{
  id: 6,
  item: 'Water Trough',
  category: 'Equipment',
  quantity: 4,
  unit: 'Units',
  minStock: 2,
  status: 'In Stock',
  lastUpdated: '2023-01-15'
}];

export function InventoryPage() {
  const columns = [
  {
    header: 'Item Name',
    accessor: 'item' as const,
    className: 'font-medium'
  },
  {
    header: 'Category',
    accessor: 'category' as const
  },
  {
    header: 'Quantity',
    accessor: 'quantity' as const
  },
  {
    header: 'Unit',
    accessor: 'unit' as const
  },
  {
    header: 'Status',
    accessor: (item: any) =>
    <Badge
      variant={
      item.status === 'In Stock' ?
      'success' :
      item.status === 'Low Stock' ?
      'warning' :
      'danger'
      }>

          {item.status}
        </Badge>

  },
  {
    header: 'Last Updated',
    accessor: 'lastUpdated' as const
  }];

  return (
    <DashboardLayout title="Inventory Management">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="bg-orange-50 text-orange-800 px-4 py-2 rounded-lg border border-orange-100 flex items-center gap-2 text-sm font-medium">
            <AlertTriangle size={16} />3 Items Low on Stock
          </div>
        </div>
        <Button icon={<Plus size={18} />}>Add Item</Button>
      </div>

      <DataTable
        data={inventoryData}
        columns={columns}
        searchPlaceholder="Search inventory..."
        actions={() =>
        <Button variant="ghost" size="sm">
            Edit
          </Button>
        } />

    </DashboardLayout>);

}