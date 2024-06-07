export interface AnalyticResponse {
    label: string,
    total: number,
    percentage: string
}

export interface EventMonth {
    type: number,
    date: string
}

export interface TotalData {
    total_employees: number
    total_areas: number,
    total_jobs: number,
    total_departments: number
}
