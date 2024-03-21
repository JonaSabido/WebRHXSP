import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { EmployeeLeaveRequest, EmployeeLeaveResponse } from '../../interfaces/employee-leave';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveService extends ApiCrudService<EmployeeLeaveRequest, EmployeeLeaveResponse>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'employeeleaves'
  }

}
