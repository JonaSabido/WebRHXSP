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
}
