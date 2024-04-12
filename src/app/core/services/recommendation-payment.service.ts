import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { HttpClient } from '@angular/common/http';
import { RecommendationPaymentQueryFilter, RecommendationPaymentRequest, RecommendationPaymentResponse } from '../../interfaces/recommendation-payment';

@Injectable({
    providedIn: 'root'
})
export class RecommendationPaymentService extends ApiCrudService<RecommendationPaymentRequest, RecommendationPaymentResponse, RecommendationPaymentQueryFilter> {

    constructor(
        http: HttpClient
    ) {
        super(http)
    }

    root(): string {
        return 'recommendationpayments'
    }
}
