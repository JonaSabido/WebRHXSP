import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface TrainingFileName {
    evidence: string
}

export interface TrainingRequest {
    id_employee: number,
    files: TrainingFileName
}

export interface TrainingResponse extends EntityBase {
    id_employee: number,
    files: TrainingFileName,
    employee: EmployeeResponse
    createdAt_formatted: string
}

export interface TrainingQueryFilter {
    id_employee: ObjectFilter<TrainingQueryFilter>
}



