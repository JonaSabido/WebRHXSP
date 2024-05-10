import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { EmployeeDiseaseQueryFilter, EmployeeDiseaseRequest, EmployeeDiseaseResponse } from '../../interfaces/employee-disease';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDiseaseService extends ApiCrudService<EmployeeDiseaseRequest, EmployeeDiseaseResponse, EmployeeDiseaseQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'employeediseases'
  }
}
