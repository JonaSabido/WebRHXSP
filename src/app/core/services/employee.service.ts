import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { EmployeeRequest, EmployeeResponse } from '../../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiCrudService<EmployeeRequest, EmployeeResponse>{

  constructor(
    http: HttpClient
  ) { 
    super(http)
  }

  root(): string{
    return 'employees'
  }
  
}
