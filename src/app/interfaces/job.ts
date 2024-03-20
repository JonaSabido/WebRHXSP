import { AreaResponse } from "./area"
import { EntityBase } from "./entity-base"

export interface JobRequest {
    id_area: number,
    name: string
}

export interface JobResponse extends EntityBase {
    id_area: number
    name: string
    area: AreaResponse
}
