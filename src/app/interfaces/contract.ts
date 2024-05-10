import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface ContractFileName {
    evidence: string
}

export interface ContractRequest {
    id_employee: number,
    start_date: Date | string,
    end_date: Date | string,
    status: boolean,
    files: ContractFileName

}

export interface ContractResponse extends EntityBase {
    id_employee: number,
    start_date: Date | string,
    start_date_formatted: string,
    end_date: Date | string,
    end_date_formatted: string,
    status: boolean,
    files: ContractFileName,
    employee: EmployeeResponse
}

export interface ContractQueryFilter {
    id_employee: ObjectFilter<ContractQueryFilter>
    status: ObjectFilter<ContractQueryFilter>
    start_year: ObjectFilter<ContractQueryFilter>
    start_start_date: ObjectFilter<ContractQueryFilter>
    start_end_date: ObjectFilter<ContractQueryFilter>
    end_year: ObjectFilter<ContractQueryFilter>
    end_start_date: ObjectFilter<ContractQueryFilter>
    end_end_date: ObjectFilter<ContractQueryFilter>
}