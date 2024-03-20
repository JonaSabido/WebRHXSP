import { EntityBase } from "./entity-base"

export interface DepartmentRequest {
}

export interface DepartmentResponse extends EntityBase {
    name: string
}
