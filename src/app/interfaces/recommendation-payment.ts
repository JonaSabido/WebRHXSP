import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"
import { RecommendationResponse } from "./recommendation"

export interface RecommendationPaymentRequest {
    id_recommendation: number,
    id_paying_employee: number,
    payment_date: string,
    status: number,
}

export interface RecommendationPaymentResponse extends EntityBase {
    id_recommendation: number,
    id_paying_employee: number,
    payment_date: string,
    payment_date_formatted: string,
    status: number,
    employee: EmployeeResponse,
    recommendation: RecommendationResponse
}

export interface RecommendationPaymentQueryFilter {
    id_paying_employee: ObjectFilter<RecommendationPaymentQueryFilter>;
    start_date: ObjectFilter<RecommendationPaymentQueryFilter>;
    end_date: ObjectFilter<RecommendationPaymentQueryFilter>
    status: ObjectFilter<RecommendationPaymentQueryFilter>;
}
