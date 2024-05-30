import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface RecommendationRequest {
    id_employee: number,
    id_recommended_employee: number,
    amount: number
}

export interface RecommendationResponse extends EntityBase {
    id_employee: number,
    id_recommended_employee: number,
    amount: number
    employee: EmployeeResponse
    recommended_employee: EmployeeResponse
}

export interface RecommendationQueryFilter {
    id_employee: ObjectFilter<RecommendationQueryFilter>
    id_recommended_employee: ObjectFilter<RecommendationQueryFilter>
    amount: ObjectFilter<RecommendationQueryFilter>
}
