import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { FileText, Download, BarChart3, PieChart } from 'lucide-react';
import { reportsService } from '../services/reportsService';
import type {
  LivestockSummaryReport,
  HealthReport,
  InventoryUsageReport,
  FinancialOverviewReport,
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
        return (
          <div className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary">{data.total_health_records}</div>
              <div className="text-sm text-text-secondary">Total Health Records</div>
            </div>
            <h4 className="font-bold text-text-primary">Vaccination Compliance</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-3 rounded-xl text-center">
                <div className="text-xl font-bold text-green-700">{data.vaccination_compliance.completed}</div>
                <div className="text-xs text-green-600">Completed</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl text-center">
                <div className="text-xl font-bold text-orange-700">{data.vaccination_compliance.pending}</div>
                <div className="text-xs text-orange-600">Pending</div>
              </div>
              <div className="bg-red-50 p-3 rounded-xl text-center">
                <div className="text-xl font-bold text-red-700">{data.vaccination_compliance.overdue}</div>
                <div className="text-xs text-red-600">Overdue</div>
              </div>
            </div>
            <h4 className="font-bold text-text-primary">Conditions</h4>
            <div className="space-y-2">
              {data.conditions.map((item) => (
                <div key={item.condition} className="flex justify-between text-sm">
                  <span className="text-text-secondary">{item.condition}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'inventory': {
        const data = reportData as InventoryUsageReport;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{data.total_items}</div>
                <div className="text-sm text-text-secondary">Total Items</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-700">
                  P{data.total_value.toLocaleString()}
                </div>
                <div className="text-sm text-text-secondary">Total Value</div>
              </div>
            </div>
            <h4 className="font-bold text-text-primary">Transactions</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-center">
                <div className="text-xl font-bold text-blue-700">{data.transactions.additions}</div>
                <div className="text-xs text-blue-600">Additions</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl text-center">
                <div className="text-xl font-bold text-orange-700">{data.transactions.usage}</div>
                <div className="text-xs text-orange-600">Usage</div>
              </div>
            </div>
            <h4 className="font-bold text-text-primary">By Category</h4>
            <div className="space-y-2">
              {data.by_category.map((item) => (
                <div key={item.category} className="flex justify-between text-sm">
                  <span className="text-text-secondary capitalize">{item.category}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
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
                  <Button variant="outline" size="sm" icon={<Download size={16} />}>
                    Export PDF
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