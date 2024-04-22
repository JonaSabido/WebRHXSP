import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EmployeeResponse } from "./employee";
import { EntityBase } from "./entity-base";

export interface AbsenceRequest {
    id_employee: number,
    id_type_absence: number,
    date: string | Date,
    description: string
}

export interface AbsenceResponse extends EntityBase {
    id_employee: number,
    reentry_date: string | Date,
    description: string
    employee?: EmployeeResponse
}

export interface AbsenceQueryFilter {
    id_employee: ObjectFilter<AbsenceQueryFilter>
    year: ObjectFilter<AbsenceQueryFilter>
    start_date: ObjectFilter<AbsenceQueryFilter>
    end_date: ObjectFilter<AbsenceQueryFilter>
}
