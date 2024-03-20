import { EntityBase } from "./entity-base"

export interface JobRequest {
}

export interface JobResponse extends EntityBase {
    id_area: number
    name: string
}
