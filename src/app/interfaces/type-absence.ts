import { EntityBase } from "./entity-base";

export interface TypeAbsenceRequest {
    name: string
}

export interface TypeAbsenceResponse extends EntityBase{
    name: string
}
