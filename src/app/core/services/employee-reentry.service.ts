import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { EmployeeReentryQueryFilter, EmployeeReentryRequest, EmployeeReentryResponse } from '../../interfaces/employee-reentry';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeReentryService extends ApiCrudService<EmployeeReentryRequest, EmployeeReentryResponse, EmployeeReentryQueryFilter>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'employeereentries'
  }

}
