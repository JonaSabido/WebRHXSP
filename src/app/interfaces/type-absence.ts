import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EntityBase } from "./entity-base";

export interface TypeAbsenceRequest {
    name: string
}

export interface TypeAbsenceResponse extends EntityBase{
    name: string
}

export interface TypeAbsenceQueryFilter {
    name: ObjectFilter<TypeAbsenceQueryFilter>
}