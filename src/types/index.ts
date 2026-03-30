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
    total_health_records: number;
    conditions: Array<{ condition: string; count: number }>;
    vaccination_compliance: {
        completed: number;
        pending: number;
        overdue: number;
    };
}

export interface InventoryUsageReport {
    report_type: string;
    period: { from: string | null; to: string | null };
    total_items: number;
    total_value: number;
    by_category: Array<{ category: string; count: number }>;
    transactions: {
        additions: number;
        usage: number;
    };
}

export interface FinancialOverviewReport {
    report_type: string;
    estimated_livestock_value: number;
    inventory_value: number;
    total_farm_value: number;
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
