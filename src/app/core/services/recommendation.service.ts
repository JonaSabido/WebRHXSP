import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { RecommendationQueryFilter, RecommendationRequest, RecommendationResponse } from '../../interfaces/recommendation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService extends ApiCrudService<RecommendationRequest, RecommendationResponse, RecommendationQueryFilter> {


  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'recommendations'
  }
}
