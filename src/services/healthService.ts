import api from './api';
import type {
    HealthRecord,
    HealthRecordCreate,
    VaccinationRecord,
    VaccinationCreate,
} from '../types';

export const healthService = {
    async getHealthRecords(): Promise<HealthRecord[]> {
        const response = await api.get<HealthRecord[]>('/health/records');
        return response.data;
    },

    async createHealthRecord(data: HealthRecordCreate): Promise<HealthRecord> {
        const response = await api.post<HealthRecord>('/health/records', data);
        return response.data;
    },

    async getVaccinations(status?: string): Promise<VaccinationRecord[]> {
        const params = status ? { status } : {};
        const response = await api.get<VaccinationRecord[]>('/health/vaccinations', { params });
        return response.data;
    },

    async createVaccination(data: VaccinationCreate): Promise<VaccinationRecord> {
        const response = await api.post<VaccinationRecord>('/health/vaccinations', data);
        return response.data;
    },

    async updateVaccination(
        id: number,
        data: Partial<VaccinationRecord>
    ): Promise<VaccinationRecord> {
        const response = await api.put<VaccinationRecord>(`/health/vaccinations/${id}`, data);
        return response.data;
    },

    async getUpcomingVaccinations(): Promise<VaccinationRecord[]> {
        const response = await api.get<VaccinationRecord[]>('/health/vaccinations/upcoming');
        return response.data;
    },
};
