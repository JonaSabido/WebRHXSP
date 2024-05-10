import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EmployeeResponse } from "./employee";
import { EntityBase } from "./entity-base";

export interface EmployeeLeaveRequest {
    id_employee: number,
    leave_date: string | Date,
    description: string
}

export interface EmployeeLeaveResponse extends EntityBase {
    id_employee: number,
    leave_date: string | Date,
    leave_date_formatted: string,
    description: string
    employee: EmployeeResponse
}

export interface EmployeeLeaveQueryFilter {
    id_employee: ObjectFilter<EmployeeLeaveQueryFilter>
    year: ObjectFilter<EmployeeLeaveQueryFilter>
    start_date: ObjectFilter<EmployeeLeaveQueryFilter>
    end_date: ObjectFilter<EmployeeLeaveQueryFilter>
}
