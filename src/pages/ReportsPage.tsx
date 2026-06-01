import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { FileText, Download, BarChart3, PieChart, Loader2 } from 'lucide-react';
import { reportsService } from '../services/reportsService';
import type {
  LivestockSummaryReport,
  HealthReport,
  InventoryUsageReport,
  FinancialOverviewReport,
  LivestockExportReport,
  HealthExportReport,
  InventoryExportReport,
  FinancialExportReport,
} from '../types';

type ReportData =
  | LivestockSummaryReport
  | HealthReport
  | InventoryUsageReport
  | FinancialOverviewReport
  | null;

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState('2023-01-01');
  const [toDate, setToDate] = useState('2023-10-01');
  const [reportData, setReportData] = useState<ReportData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reportTypes = [
    {
      id: 'livestock',
      title: 'Livestock Summary',
      icon: <BarChart3 size={24} />,
      desc: 'Herd growth, mortality rates, and breed distribution.',
    },
    {
      id: 'health',
      title: 'Health Report',
      icon: <FileText size={24} />,
      desc: 'Disease outbreaks, treatments, and veterinary costs.',
    },
    {
      id: 'inventory',
      title: 'Inventory Usage',
      icon: <PieChart size={24} />,
      desc: 'Feed consumption, medicine usage, and stock value.',
    },
    {
      id: 'financial',
      title: 'Financial Overview',
      icon: <BarChart3 size={24} />,
      desc: 'Estimated value of herd and operational expenses.',
    },
  ];

  const fetchReport = async (reportId: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedReport(reportId);
    try {
      let data: ReportData = null;
      switch (reportId) {
        case 'livestock':
          data = await reportsService.getLivestockSummary(fromDate, toDate);
          break;
        case 'health':
          data = await reportsService.getHealthReport(fromDate, toDate);
          break;
        case 'inventory':
          data = await reportsService.getInventoryUsage(fromDate, toDate);
          break;
        case 'financial':
          data = await reportsService.getFinancialOverview();
          break;
      }
      setReportData(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch report');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── PDF Export ──────────────────────────────────────────────────────────────

  const buildPrintHtml = (title: string, period: { from: string; to: string }, body: string) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>AgriTrack – ${title}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; color: #1a1a1a; padding: 32px; font-size: 13px; }
        header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 2px solid #16a34a; padding-bottom: 16px; }
        header h1 { font-size: 22px; color: #16a34a; }
        header .meta { text-align: right; color: #555; font-size: 12px; line-height: 1.6; }
        h2 { font-size: 15px; margin: 24px 0 10px; color: #16a34a; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
        th { background: #f0fdf4; color: #166534; text-align: left; padding: 7px 10px; font-size: 12px; border: 1px solid #d1fae5; }
        td { padding: 7px 10px; border: 1px solid #e5e7eb; font-size: 12px; vertical-align: top; }
        tr:nth-child(even) td { background: #fafafa; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; }
        .badge-green { background: #dcfce7; color: #166534; }
        .badge-orange { background: #ffedd5; color: #9a3412; }
        .badge-red { background: #fee2e2; color: #991b1b; }
        .badge-blue { background: #dbeafe; color: #1e40af; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 20px; }
        .summary-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; text-align: center; }
        .summary-card .value { font-size: 20px; font-weight: 700; color: #16a34a; }
        .summary-card .label { font-size: 11px; color: #6b7280; margin-top: 2px; }
        .empty { color: #9ca3af; font-style: italic; font-size: 12px; padding: 8px 0; }
        footer { margin-top: 40px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px; }
        @media print { body { padding: 16px; } }
      </style>
    </head>
    <body>
      <header>
        <div>
          <h1>🌿 AgriTrack</h1>
          <div style="font-size:13px;font-weight:600;margin-top:4px">${title}</div>
        </div>
        <div class="meta">
          <div>Period: ${period.from} – ${period.to}</div>
          <div>Generated: ${new Date().toLocaleString()}</div>
        </div>
      </header>
      ${body}
      <footer>AgriTrack Botswana &nbsp;|&nbsp; Confidential Farm Report</footer>
    </body>
    </html>
  `;

  const statusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'healthy' || s === 'completed' || s === 'in_stock' || s === 'recovered') return `<span class="badge badge-green">${status}</span>`;
    if (s === 'pending' || s === 'pregnant' || s === 'low_stock') return `<span class="badge badge-orange">${status}</span>`;
    if (s === 'sick' || s === 'overdue' || s === 'out_of_stock' || s === 'ongoing') return `<span class="badge badge-red">${status}</span>`;
    return `<span class="badge badge-blue">${status}</span>`;
  };

  const printWindow = (html: string) => {
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) { alert('Please allow pop-ups to export PDF.'); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 400);
  };

  const handleExportPdf = async () => {
    if (!selectedReport) return;
    setIsExporting(true);
    try {
      switch (selectedReport) {
        case 'livestock': {
          const d = await reportsService.exportLivestock(fromDate, toDate) as LivestockExportReport;
          const rows = d.records.map(r => `
            <tr>
              <td>${r.tag_id}</td>
              <td>${r.name ?? '—'}</td>
              <td style="text-transform:capitalize">${r.animal_type}</td>
              <td>${r.breed}</td>
              <td style="text-transform:capitalize">${r.gender}</td>
              <td>${r.date_of_birth}</td>
              <td>${r.age} yr</td>
              <td>${r.weight} kg</td>
              <td>${statusBadge(r.status)}</td>
              <td>${r.notes ?? '—'}</td>
            </tr>`).join('');
          const body = `
            <div class="summary-grid">
              <div class="summary-card"><div class="value">${d.total}</div><div class="label">Total Animals</div></div>
            </div>
            <h2>Livestock Records</h2>
            <table>
              <thead><tr><th>Tag ID</th><th>Name</th><th>Type</th><th>Breed</th><th>Gender</th><th>DOB</th><th>Age</th><th>Weight</th><th>Status</th><th>Notes</th></tr></thead>
              <tbody>${rows || '<tr><td colspan="10" class="empty">No records</td></tr>'}</tbody>
            </table>`;
          printWindow(buildPrintHtml('Livestock Summary Report', d.period, body));
          break;
        }
        case 'health': {
          const d = await reportsService.exportHealth(fromDate, toDate) as HealthExportReport;
          const hrRows = d.health_records.records.map(r => `
            <tr>
              <td>${r.animal_tag_id}</td>
              <td>${r.animal_name}</td>
              <td style="text-transform:capitalize">${r.animal_type}</td>
              <td>${r.date}</td>
              <td>${r.condition}</td>
              <td>${r.treatment}</td>
              <td>${r.veterinarian}</td>
              <td>${statusBadge(r.status)}</td>
              <td>${r.follow_up_date ?? '—'}</td>
              <td>${r.notes || '—'}</td>
            </tr>`).join('');
          const vacRows = d.vaccination_records.records.map(r => `
            <tr>
              <td>${r.animal_tag_id}</td>
              <td>${r.animal_name}</td>
              <td>${r.vaccine_name}</td>
              <td>${r.batch_number}</td>
              <td>${r.scheduled_date}</td>
              <td>${r.administered_date ?? '—'}</td>
              <td>${r.administered_by}</td>
              <td>${statusBadge(r.status)}</td>
              <td>${r.notes || '—'}</td>
            </tr>`).join('');
          const body = `
            <div class="summary-grid">
              <div class="summary-card"><div class="value">${d.health_records.total}</div><div class="label">Health Records</div></div>
              <div class="summary-card"><div class="value">${d.vaccination_records.total}</div><div class="label">Vaccination Records</div></div>
            </div>
            <h2>Health Records</h2>
            <table>
              <thead><tr><th>Tag ID</th><th>Animal</th><th>Type</th><th>Date</th><th>Condition</th><th>Treatment</th><th>Vet</th><th>Status</th><th>Follow-up</th><th>Notes</th></tr></thead>
              <tbody>${hrRows || '<tr><td colspan="10" class="empty">No records</td></tr>'}</tbody>
            </table>
            <h2>Vaccination Records</h2>
            <table>
              <thead><tr><th>Tag ID</th><th>Animal</th><th>Vaccine</th><th>Batch</th><th>Scheduled</th><th>Administered</th><th>By</th><th>Status</th><th>Notes</th></tr></thead>
              <tbody>${vacRows || '<tr><td colspan="9" class="empty">No records</td></tr>'}</tbody>
            </table>`;
          printWindow(buildPrintHtml('Health Report', d.period, body));
          break;
        }
        case 'inventory': {
          const d = await reportsService.exportInventory(fromDate, toDate) as InventoryExportReport;
          const itemRows = d.items.records.map(r => `
            <tr>
              <td>${r.item_name}</td>
              <td style="text-transform:capitalize">${r.category}</td>
              <td>${r.quantity} ${r.unit}</td>
              <td>${r.min_stock_level} ${r.unit}</td>
              <td>${statusBadge(r.status.replace('_', ' '))}</td>
              <td>${r.supplier || '—'}</td>
              <td>P${r.cost_per_unit.toLocaleString()}</td>
              <td>P${r.total_value.toLocaleString()}</td>
              <td>${r.description || '—'}</td>
            </tr>`).join('');
          const body = `
            <div class="summary-grid">
              <div class="summary-card"><div class="value">${d.items.total}</div><div class="label">Total Items</div></div>
              <div class="summary-card"><div class="value">${d.transactions.total}</div><div class="label">Transactions</div></div>
            </div>
            <h2>Inventory Items</h2>
            <table>
              <thead><tr><th>Item</th><th>Category</th><th>Quantity</th><th>Min Stock</th><th>Status</th><th>Supplier</th><th>Cost/Unit</th><th>Total Value</th><th>Description</th></tr></thead>
              <tbody>${itemRows || '<tr><td colspan="9" class="empty">No records</td></tr>'}</tbody>
            </table>`;
          printWindow(buildPrintHtml('Inventory Usage Report', d.period, body));
          break;
        }
        case 'financial': {
          const d = await reportsService.exportFinancial(fromDate, toDate) as FinancialExportReport;
          const invRows = d.inventory_valuation.records.map(r => `
            <tr>
              <td>${r.item_name}</td>
              <td style="text-transform:capitalize">${r.category}</td>
              <td>${r.quantity} ${r.unit}</td>
              <td>${statusBadge(r.status.replace('_', ' '))}</td>
              <td>${r.supplier || '—'}</td>
              <td>P${r.cost_per_unit.toLocaleString()}</td>
              <td>P${r.total_value.toLocaleString()}</td>
            </tr>`).join('');
          const body = `
            <div class="summary-grid">
              <div class="summary-card"><div class="value">P${d.summary.total_inventory_value.toLocaleString()}</div><div class="label">Inventory Value</div></div>
              <div class="summary-card"><div class="value">P${d.summary.total_addition_cost.toLocaleString()}</div><div class="label">Addition Cost</div></div>
              <div class="summary-card"><div class="value">P${d.summary.total_usage_cost.toLocaleString()}</div><div class="label">Usage Cost</div></div>
              <div class="summary-card"><div class="value">P${d.summary.net_cost.toLocaleString()}</div><div class="label">Net Cost</div></div>
            </div>
            <h2>Inventory Valuation</h2>
            <table>
              <thead><tr><th>Item</th><th>Category</th><th>Quantity</th><th>Status</th><th>Supplier</th><th>Cost/Unit</th><th>Total Value</th></tr></thead>
              <tbody>${invRows || '<tr><td colspan="7" class="empty">No records</td></tr>'}</tbody>
            </table>`;
          printWindow(buildPrintHtml('Financial Overview Report', d.period, body));
          break;
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const renderReportContent = () => {
    if (isLoading) {
      return <div className="text-center py-12 text-text-secondary">Generating report...</div>;
    }
    if (error) {
      return <div className="text-center py-12 text-red-600">{error}</div>;
    }
    if (!reportData) return null;

    switch (selectedReport) {
      case 'livestock': {
        const data = reportData as LivestockSummaryReport;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{data.total_livestock}</div>
                <div className="text-sm text-text-secondary">Total Livestock</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-700">
                  {data.average_weight ? `${Math.round(data.average_weight)} kg` : 'N/A'}
                </div>
                <div className="text-sm text-text-secondary">Avg Weight</div>
              </div>
            </div>
            <h4 className="font-bold text-text-primary">By Type</h4>
            <div className="space-y-2">
              {data.breakdown_by_type.map((item) => (
                <div key={item.animal_type} className="flex justify-between text-sm">
                  <span className="text-text-secondary capitalize">{item.animal_type}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
            <h4 className="font-bold text-text-primary">By Status</h4>
            <div className="space-y-2">
              {data.breakdown_by_status.map((item) => (
                <div key={item.status} className="flex justify-between text-sm">
                  <span className="text-text-secondary capitalize">{item.status}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'health': {
        const data = reportData as HealthReport;

        // Build a lookup for vaccination statuses
        const vaccinationStatusMap: Record<string, number> = {};
        data.vaccinations.by_status.forEach(({ status, count }) => {
          vaccinationStatusMap[status] = count;
        });

        const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
          completed: { bg: 'bg-green-50', text: 'text-green-700', label: 'Completed' },
          pending:   { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Pending' },
          overdue:   { bg: 'bg-red-50',   text: 'text-red-700',   label: 'Overdue' },
        };

        return (
          <div className="space-y-6">
            {/* Summary tiles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{data.health_records.total}</div>
                <div className="text-sm text-text-secondary">Total Health Records</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-700">{data.vaccinations.total}</div>
                <div className="text-sm text-text-secondary">Total Vaccinations</div>
              </div>
            </div>

            {/* Vaccination status breakdown */}
            <div>
              <h4 className="font-bold text-text-primary mb-3">Vaccination Status</h4>
              <div className="grid grid-cols-3 gap-3">
                {data.vaccinations.by_status.length > 0 ? (
                  data.vaccinations.by_status.map(({ status, count }) => {
                    const style = statusStyles[status] ?? {
                      bg: 'bg-gray-50',
                      text: 'text-gray-700',
                      label: status,
                    };
                    return (
                      <div key={status} className={`${style.bg} p-3 rounded-xl text-center`}>
                        <div className={`text-xl font-bold ${style.text}`}>{count}</div>
                        <div className={`text-xs capitalize ${style.text}`}>{style.label}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-3 text-sm text-text-secondary text-center py-2">No vaccination data</div>
                )}
              </div>
            </div>

            {/* Conditions breakdown */}
            <div>
              <h4 className="font-bold text-text-primary mb-3">Conditions Recorded</h4>
              {data.health_records.by_condition.length > 0 ? (
                <div className="space-y-2">
                  {data.health_records.by_condition.map((item) => (
                    <div key={item.condition} className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0">
                      <span className="text-text-secondary">{item.condition}</span>
                      <span className="font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs">{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-text-secondary text-center py-2">No conditions recorded</div>
              )}
            </div>
          </div>
        );
      }
      case 'inventory': {
        const data = reportData as InventoryUsageReport;
        return (
          <div className="space-y-6">
            {/* Summary tiles */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{data.items.total}</div>
                <div className="text-sm text-text-secondary">Total Items</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-700">{data.transactions.total}</div>
                <div className="text-sm text-text-secondary">Transactions</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-700">{data.items.low_stock_alerts.length}</div>
                <div className="text-sm text-text-secondary">Low Stock Alerts</div>
              </div>
            </div>

            {/* Transactions breakdown */}
            <div>
              <h4 className="font-bold text-text-primary mb-3">Transactions</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-xl text-center">
                  <div className="text-xl font-bold text-green-700">{data.transactions.total_added}</div>
                  <div className="text-xs text-green-600">Total Added</div>
                </div>
                <div className="bg-red-50 p-3 rounded-xl text-center">
                  <div className="text-xl font-bold text-red-700">{data.transactions.total_used}</div>
                  <div className="text-xs text-red-600">Total Used</div>
                </div>
              </div>
            </div>

            {/* By Category */}
            <div>
              <h4 className="font-bold text-text-primary mb-3">By Category</h4>
              {data.items.by_category.length > 0 ? (
                <div className="space-y-2">
                  {data.items.by_category.map((item) => (
                    <div key={item.category} className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0">
                      <span className="text-text-secondary capitalize">{item.category}</span>
                      <span className="font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-text-secondary text-center py-2">No category data</div>
              )}
            </div>

            {/* By Status */}
            <div>
              <h4 className="font-bold text-text-primary mb-3">By Status</h4>
              {data.items.by_status.length > 0 ? (
                <div className="space-y-2">
                  {data.items.by_status.map((item) => (
                    <div key={item.status} className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0">
                      <span className="text-text-secondary capitalize">{item.status.replace('_', ' ')}</span>
                      <span className="font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-text-secondary text-center py-2">No status data</div>
              )}
            </div>

            {/* Low Stock Alerts */}
            {data.items.low_stock_alerts.length > 0 && (
              <div>
                <h4 className="font-bold text-text-primary mb-3">⚠ Low Stock Alerts</h4>
                <div className="space-y-2">
                  {data.items.low_stock_alerts.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm p-3 bg-red-50 rounded-lg">
                      <span className="text-red-800 font-medium">{item.item_name}</span>
                      <span className="text-red-600 text-xs">{item.quantity} {item.unit} (min: {item.min_stock_level})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
      case 'financial': {
        const data = reportData as FinancialOverviewReport;
        return (
          <div className="space-y-6">
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary">
                P{data.total_farm_value.toLocaleString()}
              </div>
              <div className="text-sm text-text-secondary mt-1">Total Farm Value</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-xl font-bold text-green-700">
                  P{data.estimated_livestock_value.toLocaleString()}
                </div>
                <div className="text-sm text-green-600">Livestock Value</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-xl font-bold text-blue-700">
                  P{data.inventory_value.toLocaleString()}
                </div>
                <div className="text-sm text-blue-600">Inventory Value</div>
              </div>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Selection */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-bold text-lg text-text-primary">Generate Report</h3>
          <div className="space-y-4">
            {reportTypes.map((report) => (
              <Card
                key={report.id}
                className={`cursor-pointer transition-all ${selectedReport === report.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:border-primary/50'
                  }`}
                onClick={() => fetchReport(report.id)}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    {report.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary">{report.title}</h4>
                    <p className="text-sm text-text-secondary mt-1">{report.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <Card className="min-h-[600px]">
            {selectedReport ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h3 className="font-bold text-xl text-text-primary">
                    {reportTypes.find((r) => r.id === selectedReport)?.title}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPdf}
                    disabled={isExporting || !reportData}
                    icon={isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}>
                    {isExporting ? 'Exporting…' : 'Export PDF'}
                  </Button>
                </div>

                {selectedReport !== 'financial' && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="From Date"
                      type="date"
                      value={fromDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromDate(e.target.value)}
                    />
                    <Input
                      label="To Date"
                      type="date"
                      value={toDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToDate(e.target.value)}
                    />
                    <div className="col-span-2">
                      <Button
                        size="sm"
                        onClick={() => fetchReport(selectedReport)}>
                        Refresh Report
                      </Button>
                    </div>
                  </div>
                )}

                {renderReportContent()}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <FileText size={40} />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">Select a Report</h3>
                <p className="text-text-secondary max-w-xs">
                  Choose a report type from the list to generate detailed analytics and insights
                  for your farm.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}