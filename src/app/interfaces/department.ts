import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EntityBase } from "./entity-base"

export interface DepartmentRequest {
    name: string
}

export interface DepartmentResponse extends EntityBase {
    name: string
}

export interface DepartmentQueryFilter {
    name: ObjectFilter<DepartmentQueryFilter>
}