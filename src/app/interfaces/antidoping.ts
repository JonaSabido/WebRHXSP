import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface AntidopingFileName {
    photo: string
    evidence: string
}

export interface AntidopingRequest {
    id_employee: number,
    files: AntidopingFileName
}

export interface AntidopingResponse extends EntityBase {
    id_employee: number,
    files: AntidopingFileName,
    employee: EmployeeResponse,
    createdAt_formatted: string
}

export interface AntidopingQueryFilter {
    id_employee: ObjectFilter<AntidopingQueryFilter>
}



