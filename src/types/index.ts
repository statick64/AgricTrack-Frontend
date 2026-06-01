// ========================
// Authentication Types
// ========================

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    farm_name: string;
    phone_number: string;
    location: string;
    profile_picture: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    full_name: string;
    email: string;
    password: string;
    farm_name: string;
    phone_number: string;
    location: string;
}

export interface TokenResponse {
    token: string;
    user: User;
}

export interface ErrorResponse {
    error: string;
}

// ========================
// Livestock Types
// ========================

export type AnimalType = 'cattle' | 'goat' | 'sheep' | 'poultry';
export type Gender = 'male' | 'female';
export type LivestockStatus = 'healthy' | 'sick' | 'pregnant' | 'quarantine';

export interface Livestock {
    id: string;
    tag_id: string;
    name: string | null;
    animal_type: string;
    breed: string;
    gender: string;
    date_of_birth: string;
    weight: number;
    status: string;
    notes: string | null;
    created_at: string;
    age: number;
}

export interface LivestockCreate {
    tag_id: string;
    name: string | null;
    animal_type: string;
    breed: string;
    gender: string;
    date_of_birth: string;
    weight: number;
    status: string;
    notes: string | null;
}

export interface LivestockUpdate {
    name: string | null;
    weight: number | null;
    status: string | null;
    notes: string | null;
}

export interface LivestockStats {
    total: number;
    by_type: Array<{ animal_type: string; count: number }>;
    by_status: Array<{ status: string; count: number }>;
}

// ========================
// Health Types
// ========================

export type HealthStatus = 'ongoing' | 'recovered' | 'healthy';

export interface HealthRecord {
    id: string;
    animal_id: string;
    date: string;
    condition: string;
    treatment: string;
    veterinarian: string;
    status: HealthStatus;
    notes: string;
    follow_up_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface HealthRecordCreate {
    animal_id: string;
    date: string;
    condition: string;
    treatment: string;
    veterinarian: string;
    status: string;
    notes?: string;
    follow_up_date?: string | null;
}

// ========================
// Vaccination Types
// ========================

export type VaccinationStatus = 'pending' | 'completed' | 'overdue';

export interface VaccinationRecord {
    id: string;
    animal_id: string | null;
    group_name: string;
    vaccine_name: string;
    scheduled_date: string;
    administered_date: string | null;
    administered_by: string;
    status: VaccinationStatus;
    batch_number: string;
    notes: string;
    created_at: string;
    updated_at: string;
}

export interface VaccinationCreate {
    animal_id?: string;
    group_name?: string;
    vaccine_name: string;
    scheduled_date: string;
    administered_date?: string;
    administered_by?: string;
    status?: string;
    batch_number?: string;
    notes?: string;
}

// ========================
// Inventory Types
// ========================

export type InventoryCategory = 'feed' | 'medicine' | 'equipment' | 'other';
export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type TransactionType = 'add' | 'use' | 'adjust';

export interface InventoryItem {
    id: number;
    item_name: string;
    category: InventoryCategory;
    quantity: number;
    unit: string;
    min_stock_level: number;
    status: InventoryStatus;
    description: string;
    supplier: string;
    cost_per_unit: number | null;
    last_updated: string;
    created_at: string;
}

export interface InventoryItemCreate {
    item_name: string;
    category: InventoryCategory;
    quantity: number;
    unit: string;
    min_stock_level: number;
    description?: string;
    supplier?: string;
    cost_per_unit?: number;
}

export interface InventoryTransaction {
    id: number;
    item: number;
    transaction_type: TransactionType;
    quantity: number;
    notes: string;
    transaction_date: string;
}

export interface InventoryTransactionCreate {
    item_id: number;
    transaction_type: TransactionType;
    quantity: number;
    notes?: string;
}

export interface LowStockAlert {
    count: number;
    items: Array<{
        id: number;
        item_name: string;
        quantity: number;
        unit: string;
        min_stock_level: number;
    }>;
}

// ========================
// Report Types
// ========================

export interface LivestockSummaryReport {
    report_type: string;
    period: { from: string | null; to: string | null };
    total_livestock: number;
    breakdown_by_type: Array<{ animal_type: string; count: number }>;
    breakdown_by_status: Array<{ status: string; count: number }>;
    average_weight: number | null;
}

export interface HealthReport {
    report_type: string;
    period: { from: string | null; to: string | null };
    health_records: {
        total: number;
        by_condition: Array<{ condition: string; count: number }>;
    };
    vaccinations: {
        total: number;
        by_status: Array<{ status: string; count: number }>;
    };
}

export interface InventoryUsageReport {
    report_type: string;
    period: { from: string | null; to: string | null };
    items: {
        total: number;
        by_category: Array<{ category: string; count: number }>;
        by_status: Array<{ status: string; count: number }>;
        low_stock_alerts: Array<{ id: number; item_name: string; quantity: number; unit: string; min_stock_level: number }>;
    };
    transactions: {
        total: number;
        total_added: string;
        total_used: string;
        by_type: Array<{ type: string; count: number }>;
    };
}

export interface FinancialOverviewReport {
    report_type: string;
    estimated_livestock_value: number;
    inventory_value: number;
    total_farm_value: number;
}

// ========================
// Export Report Types
// ========================

export interface LivestockExportReport {
    report_type: string;
    period: { from: string; to: string };
    total: number;
    records: Array<{
        id: string;
        tag_id: string;
        name: string | null;
        animal_type: string;
        breed: string;
        gender: string;
        date_of_birth: string;
        age: number;
        weight: number;
        status: string;
        notes: string | null;
        created_at: string;
        updated_at: string;
    }>;
}

export interface HealthExportReport {
    report_type: string;
    period: { from: string; to: string };
    health_records: {
        total: number;
        records: Array<{
            id: number;
            animal_tag_id: string;
            animal_name: string;
            animal_type: string;
            date: string;
            condition: string;
            treatment: string;
            veterinarian: string;
            status: string;
            notes: string;
            follow_up_date: string | null;
            created_at: string;
        }>;
    };
    vaccination_records: {
        total: number;
        records: Array<{
            id: number;
            animal_tag_id: string;
            animal_name: string;
            group_name: string;
            vaccine_name: string;
            scheduled_date: string;
            administered_date: string | null;
            administered_by: string;
            batch_number: string;
            status: string;
            notes: string;
            created_at: string;
        }>;
    };
}

export interface InventoryExportReport {
    report_type: string;
    period: { from: string; to: string };
    items: {
        total: number;
        records: Array<{
            id: number;
            item_name: string;
            category: string;
            quantity: number;
            unit: string;
            min_stock_level: number;
            status: string;
            description: string;
            supplier: string;
            cost_per_unit: number;
            total_value: number;
            created_at: string;
            last_updated: string;
        }>;
    };
    transactions: {
        total: number;
        records: Array<{ id: number; transaction_type: string; quantity: number; notes: string; transaction_date: string }>;
    };
}

export interface FinancialExportReport {
    report_type: string;
    period: { from: string; to: string };
    summary: {
        total_inventory_value: number;
        total_addition_cost: number;
        total_usage_cost: number;
        net_cost: number;
    };
    inventory_valuation: {
        total: number;
        records: Array<{
            id: number;
            item_name: string;
            category: string;
            quantity: number;
            unit: string;
            cost_per_unit: number;
            total_value: number;
            status: string;
            supplier: string;
            last_updated: string;
        }>;
    };
    costed_transactions: {
        total: number;
        records: Array<{ id: number; transaction_type: string; quantity: number; notes: string; transaction_date: string }>;
    };
}

// ========================
// Training Types
// ========================

export type TrainingCategory =
    | 'animal_health'
    | 'farm_management'
    | 'market_info'
    | 'nutrition'
    | 'government_programs';

export interface TrainingResource {
    id: number;
    title: string;
    category: TrainingCategory;
    description: string;
    content: string;
    featured_image: string | null;
    external_link: string;
    read_time: number;
    is_featured: boolean;
    published_date: string;
    updated_at: string;
}

// ========================
// Dashboard Types
// ========================

export interface DashboardData {
    stats: LivestockStats;
    upcomingVaccinations: VaccinationRecord[];
    lowStockAlerts: LowStockAlert;
    healthIssueCount: number;
}
