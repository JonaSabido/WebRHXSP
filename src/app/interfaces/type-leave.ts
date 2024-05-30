import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EntityBase } from "./entity-base";

export interface TypeLeaveRequest {
    name: string
}

export interface TypeLeaveResponse extends EntityBase{
    name: string
}

export interface TypeLeaveQueryFilter {
    name: ObjectFilter<TypeLeaveQueryFilter>
}