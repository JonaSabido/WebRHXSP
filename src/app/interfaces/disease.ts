import { EntityBase } from "./entity-base";

export interface DiseaseRequest {
    name: string
}

export interface DiseaseResponse extends EntityBase{
    name: string
}
