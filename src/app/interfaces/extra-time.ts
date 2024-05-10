import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface ExtraTimeFileName {
    evidence: string
}

export interface ExtraTimeRequest {
    id_employee: number,
    date: string,
    files: ExtraTimeFileName
}

export interface ExtraTimeResponse extends EntityBase {
    id_employee: number,
    date: string,
    date_formatted: string,
    files: ExtraTimeFileName,
    employee: EmployeeResponse
    createdAt_formatted: string
}

export interface ExtraTimeQueryFilter {
    id_employee: ObjectFilter<ExtraTimeQueryFilter>,
    year: ObjectFilter<ExtraTimeQueryFilter>
    start_date: ObjectFilter<ExtraTimeQueryFilter>
    end_date: ObjectFilter<ExtraTimeQueryFilter>
}



