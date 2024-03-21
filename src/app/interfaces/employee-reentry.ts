import { EmployeeResponse } from "./employee";
import { EntityBase } from "./entity-base";

export interface EmployeeReentryRequest {
    id_employee: number,
    reentry_date: string | Date,
    description: string
}

export interface EmployeeReentryResponse extends EntityBase {
    id_employee: number,
    reentry_date: string | Date,
    description: string
    employee?: EmployeeResponse
}
