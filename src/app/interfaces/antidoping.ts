import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface AntidopingFileName {
    photo: string
    evidence: string
}

export interface AntidopingRequest {
    id_employee: number,
    result: string,
    comments: string,
    files: AntidopingFileName
}

export interface AntidopingResponse extends EntityBase {
    id_employee: number,
    result: string,
    comments: string,
    files: AntidopingFileName,
    employee: EmployeeResponse,
    createdAt_formatted: string
}

export interface AntidopingQueryFilter {
    id_employee: ObjectFilter<AntidopingQueryFilter>,
    result: ObjectFilter<AntidopingQueryFilter>
    year: ObjectFilter<AntidopingQueryFilter>
    start_date: ObjectFilter<AntidopingQueryFilter>
    end_date: ObjectFilter<AntidopingQueryFilter>
}



