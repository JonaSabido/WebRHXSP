import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EntityBase } from "./entity-base";

export interface DiseaseRequest {
    name: string
}

export interface DiseaseResponse extends EntityBase{
    name: string
}

export interface DiseaseQueryFilter {
    name: ObjectFilter<DiseaseQueryFilter>
}
