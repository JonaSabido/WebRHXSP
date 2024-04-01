import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { DiseaseResponse } from '../../interfaces/disease';
import { HttpClient } from '@angular/common/http';
import { ContractRequest, ContractResponse } from '../../interfaces/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends ApiCrudService<ContractRequest, ContractResponse>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'contracts'
  }
}
