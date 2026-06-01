import api from './api';
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

    async exportLivestock(fromDate?: string, toDate?: string): Promise<LivestockExportReport> {
        const params: Record<string, string> = {};
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        const response = await api.get<LivestockExportReport>('/reports/export/livestock', { params });
        return response.data;
    },

    async exportHealth(fromDate?: string, toDate?: string): Promise<HealthExportReport> {
        const params: Record<string, string> = {};
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        const response = await api.get<HealthExportReport>('/reports/export/health', { params });
        return response.data;
    },

    async exportInventory(fromDate?: string, toDate?: string): Promise<InventoryExportReport> {
        const params: Record<string, string> = {};
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        const response = await api.get<InventoryExportReport>('/reports/export/inventory', { params });
        return response.data;
    },

    async exportFinancial(fromDate?: string, toDate?: string): Promise<FinancialExportReport> {
        const params: Record<string, string> = {};
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        const response = await api.get<FinancialExportReport>('/reports/export/financial', { params });
        return response.data;
    },
};
