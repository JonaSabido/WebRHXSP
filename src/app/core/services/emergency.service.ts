import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { DiseaseResponse } from '../../interfaces/disease';
import { HttpClient } from '@angular/common/http';
import { EmergencyRequest, EmergencyResponse } from '../../interfaces/emergency';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService extends ApiCrudService<EmergencyRequest, EmergencyResponse>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'emergencies'
  }
}
