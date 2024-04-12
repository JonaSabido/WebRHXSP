import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { DepartmentQueryFilter, DepartmentRequest, DepartmentResponse } from '../../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends ApiCrudService<DepartmentRequest, DepartmentResponse, DepartmentQueryFilter>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'departments'
  }
}
