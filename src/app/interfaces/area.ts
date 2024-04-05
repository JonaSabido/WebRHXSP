import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EntityBase } from "./entity-base";

export interface AreaRequest {
    name: string
}

export interface AreaResponse extends EntityBase {
    name: string
}

export interface AreaQueryFilter {
    name: ObjectFilter<AreaQueryFilter>
}
