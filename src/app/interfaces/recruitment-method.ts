import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EntityBase } from "./entity-base";

export interface RecruitmentMethodRequest {
    name: string
}

export interface RecruitmentMethodResponse extends EntityBase {
    name: string
}

export interface RecruitmentMethodQueryFilter {
    name: ObjectFilter<RecruitmentMethodQueryFilter>
}
