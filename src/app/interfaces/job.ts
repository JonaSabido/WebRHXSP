import { ObjectFilter } from "../../../shared/interfaces/object-filter"
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

export interface JobQueryFilter {
    id_area: ObjectFilter<JobQueryFilter>,
    name: ObjectFilter<JobQueryFilter>
}
