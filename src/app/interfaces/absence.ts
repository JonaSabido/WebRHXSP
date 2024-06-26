import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EmployeeResponse } from "./employee";
import { EntityBase } from "./entity-base";
import { JobResponse } from "./job";
import { TypeAbsenceResponse } from "./type-absence";

export interface AbsenceRequest {
    id_employee: number,
    id_type_absence: number,
    date: string | Date,
    description: string
}

export interface AbsenceResponse extends EntityBase {
    id_employee: number,
    id_type_absence: number,
    date: string | Date,
    date_formatted: string,
    description: string
    employee: EmployeeResponse,
    job: JobResponse
    type_absence: TypeAbsenceResponse
}

export interface AbsenceChartResponse {
    total: number,
    dates: string,
    employee: EmployeeResponse
}

export interface AbsenceQueryFilter {
    id_employee: ObjectFilter<AbsenceQueryFilter>
    id_type_absence: ObjectFilter<AbsenceQueryFilter>
    id_job: ObjectFilter<AbsenceQueryFilter>
    year: ObjectFilter<AbsenceQueryFilter>
    start_date: ObjectFilter<AbsenceQueryFilter>
    end_date: ObjectFilter<AbsenceQueryFilter>
}
