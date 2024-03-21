import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface EmergencyRequest {
    id_employee: number,
    reference_name: string,
    type: string,
    phone: string
}

export interface EmergencyResponse extends EntityBase {
    id_employee: number,
    reference_name: string,
    type: string,
    phone: string
    employee: EmployeeResponse
}
