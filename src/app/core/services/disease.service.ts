import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { DiseaseQueryFilter, DiseaseRequest, DiseaseResponse } from '../../interfaces/disease';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService extends ApiCrudService<DiseaseRequest, DiseaseResponse, DiseaseQueryFilter>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'diseases'
  }
}
