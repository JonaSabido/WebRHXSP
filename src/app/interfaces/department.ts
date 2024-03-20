import { EntityBase } from "./entity-base"

export interface DepartmentRequest {
    name: string
}

export interface DepartmentResponse extends EntityBase {
    name: string
}
