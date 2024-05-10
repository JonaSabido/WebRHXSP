import { ObjectFilter } from "../../../shared/interfaces/object-filter";
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
    reentry_date_formatted: string,
    description: string
    employee: EmployeeResponse
}

export interface EmployeeReentryQueryFilter {
    id_employee: ObjectFilter<EmployeeReentryQueryFilter>
    year: ObjectFilter<EmployeeReentryQueryFilter>
    start_date: ObjectFilter<EmployeeReentryQueryFilter>
    end_date: ObjectFilter<EmployeeReentryQueryFilter>
}
