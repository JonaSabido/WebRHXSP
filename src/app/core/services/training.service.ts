import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { TrainingQueryFilter, TrainingRequest, TrainingResponse } from '../../interfaces/training';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService extends ApiCrudService<TrainingRequest, TrainingResponse, TrainingQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'trainings'
  }
}
