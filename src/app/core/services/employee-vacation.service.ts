import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { EmployeeVacationQueryFilter, EmployeeVacationRequest, EmployeeVacationResponse } from '../../interfaces/employee-vacation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeVacationService extends ApiCrudService<EmployeeVacationRequest, EmployeeVacationResponse, EmployeeVacationQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'employeevacations'
  }
}
