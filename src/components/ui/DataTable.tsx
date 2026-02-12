import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: (item: T) => React.ReactNode;
  mobileRender?: (item: T) => React.ReactNode;
}
export function DataTable<
  T extends {
    id: string | number;
  }>(
{
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'Search...',
  actions,
  mobileRender
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Filter data
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    return Object.values(item).some((val) =>
    String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="w-full">
      {searchable &&
      <div className="mb-4">
          <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="w-5 h-5" />}
          className="max-w-md" />

        </div>
      }

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col, idx) =>
              <th
                key={idx}
                className={`px-6 py-4 font-semibold text-text-secondary ${col.className || ''}`}>

                  {col.header}
                </th>
              )}
              {actions &&
              <th className="px-6 py-4 font-semibold text-text-secondary text-right">
                  Actions
                </th>
              }
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length > 0 ?
            paginatedData.map((item) =>
            <tr
              key={item.id}
              className="hover:bg-gray-50/50 transition-colors">

                  {columns.map((col, idx) =>
              <td key={idx} className="px-6 py-4 text-text-primary">
                      {typeof col.accessor === 'function' ?
                col.accessor(item) :
                item[col.accessor] as React.ReactNode}
                    </td>
              )}
                  {actions &&
              <td className="px-6 py-4 text-right">{actions(item)}</td>
              }
                </tr>
            ) :

            <tr>
                <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-12 text-center text-text-muted">

                  No data found
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedData.length > 0 ?
        paginatedData.map((item) =>
        <div key={item.id}>
              {mobileRender ?
          mobileRender(item) :

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  {columns.map((col, idx) =>
            <div
              key={idx}
              className="flex justify-between py-2 border-b border-gray-50 last:border-0">

                      <span className="font-medium text-text-secondary">
                        {col.header}
                      </span>
                      <span className="text-text-primary text-right">
                        {typeof col.accessor === 'function' ?
                col.accessor(item) :
                item[col.accessor] as React.ReactNode}
                      </span>
                    </div>
            )}
                  {actions &&
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
                      {actions(item)}
                    </div>
            }
                </div>
          }
            </div>
        ) :

        <div className="text-center py-12 text-text-muted bg-white rounded-xl border border-gray-200">
            No data found
          </div>
        }
      </div>

      {/* Pagination */}
      {totalPages > 1 &&
      <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm text-text-secondary">
            Showing{' '}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredData.length)}
            </span>{' '}
            of <span className="font-medium">{filteredData.length}</span>{' '}
            results
          </p>
          <div className="flex gap-2">
            <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}>

              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}>

              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      }
    </div>);

}