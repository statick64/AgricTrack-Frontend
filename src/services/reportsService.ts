import api from './api';
import type {
    LivestockSummaryReport,
    HealthReport,
    InventoryUsageReport,
    FinancialOverviewReport,
} from '../types';

export const reportsService = {
    async getLivestockSummary(fromDate?: string, toDate?: string): Promise<LivestockSummaryReport> {
        const params: Record<string, string> = {};
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        const response = await api.get<LivestockSummaryReport>('/reports/livestock-summary', { params });
        return response.data;
    },

    async getHealthReport(fromDate?: string, toDate?: string): Promise<HealthReport> {
        const params: Record<string, string> = {};
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        const response = await api.get<HealthReport>('/reports/health-report', { params });
        return response.data;
    },

    async getInventoryUsage(fromDate?: string, toDate?: string): Promise<InventoryUsageReport> {
        const params: Record<string, string> = {};
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        const response = await api.get<InventoryUsageReport>('/reports/inventory-usage', { params });
        return response.data;
    },

    async getFinancialOverview(): Promise<FinancialOverviewReport> {
        const response = await api.get<FinancialOverviewReport>('/reports/financial-overview');
        return response.data;
    },
};
