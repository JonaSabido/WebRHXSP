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
    description: string
    employee?: EmployeeResponse
}
