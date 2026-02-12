import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { FileText, Download, BarChart3, PieChart } from 'lucide-react';
export function ReportsPage() {
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const reportTypes = [
  {
    id: 'livestock',
    title: 'Livestock Summary',
    icon: <BarChart3 size={24} />,
    desc: 'Herd growth, mortality rates, and breed distribution.'
  },
  {
    id: 'health',
    title: 'Health Report',
    icon: <FileText size={24} />,
    desc: 'Disease outbreaks, treatments, and veterinary costs.'
  },
  {
    id: 'inventory',
    title: 'Inventory Usage',
    icon: <PieChart size={24} />,
    desc: 'Feed consumption, medicine usage, and stock value.'
  },
  {
    id: 'financial',
    title: 'Financial Overview',
    icon: <BarChart3 size={24} />,
    desc: 'Estimated value of herd and operational expenses.'
  }];

  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Selection */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-bold text-lg text-text-primary">
            Generate Report
          </h3>
          <div className="space-y-4">
            {reportTypes.map((report) =>
            <Card
              key={report.id}
              className={`cursor-pointer transition-all ${generatedReport === report.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'}`}
              onClick={() => setGeneratedReport(report.id)}>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    {report.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary">
                      {report.title}
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">
                      {report.desc}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Report Configuration & Preview */}
        <div className="lg:col-span-2">
          <Card className="min-h-[600px]">
            {generatedReport ?
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h3 className="font-bold text-xl text-text-primary">
                    {reportTypes.find((r) => r.id === generatedReport)?.title}
                  </h3>
                  <Button
                  variant="outline"
                  size="sm"
                  icon={<Download size={16} />}>

                    Export PDF
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                  label="From Date"
                  type="date"
                  defaultValue="2023-01-01" />

                  <Input
                  label="To Date"
                  type="date"
                  defaultValue="2023-10-01" />

                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                  {/* Mock Chart Visualization */}
                  <div className="flex items-end justify-center gap-4 h-64 mb-4">
                    <div className="w-16 bg-primary/40 h-[60%] rounded-t-lg relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Jan-Mar
                      </div>
                    </div>
                    <div className="w-16 bg-primary/60 h-[80%] rounded-t-lg relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Apr-Jun
                      </div>
                    </div>
                    <div className="w-16 bg-primary h-[90%] rounded-t-lg relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Jul-Sep
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Quarterly Performance Overview
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-text-primary">Key Insights</h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Herd size increased by 15% compared to last quarter.
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Vaccination compliance is at 98%.
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Feed costs have risen by 8% due to seasonal pricing.
                    </li>
                  </ul>
                </div>
              </div> :

            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <FileText size={40} />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">
                  Select a Report
                </h3>
                <p className="text-text-secondary max-w-xs">
                  Choose a report type from the list to generate detailed
                  analytics and insights for your farm.
                </p>
              </div>
            }
          </Card>
        </div>
      </div>
    </DashboardLayout>);

}