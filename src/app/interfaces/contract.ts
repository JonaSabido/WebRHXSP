import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface ContractRequest {
    id_employee: number,
    start_date: Date | string,
    end_date: Date | string,
    status: boolean,
}

export interface ContractResponse extends EntityBase {
    id_employee: number,
    start_date: Date | string,
    end_date: Date | string,
    status: boolean,
}
