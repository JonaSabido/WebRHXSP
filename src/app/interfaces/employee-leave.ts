import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EmployeeResponse } from "./employee";
import { EntityBase } from "./entity-base";
import { TypeLeaveResponse } from "./type-leave";

export interface EmployeeLeaveRequest {
    id_employee: number,
    id_type_leave: number,
    leave_date: string | Date,
    description: string
}

export interface EmployeeLeaveResponse extends EntityBase {
    id_employee: number,
    id_type_leave: number,
    leave_date: string | Date,
    leave_date_formatted: string,
    description: string
    employee: EmployeeResponse
    type_leave: TypeLeaveResponse
}

export interface EmployeeLeaveQueryFilter {
    id_employee: ObjectFilter<EmployeeLeaveQueryFilter>
    id_type_leave: ObjectFilter<EmployeeLeaveQueryFilter>
    year: ObjectFilter<EmployeeLeaveQueryFilter>
    start_date: ObjectFilter<EmployeeLeaveQueryFilter>
    end_date: ObjectFilter<EmployeeLeaveQueryFilter>
}
