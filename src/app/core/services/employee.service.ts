import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { EmployeeQueryFilter, EmployeeRequest, EmployeeResponse } from '../../interfaces/employee';
import { Observable } from 'rxjs';
import { SingleEntity } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiCrudService<EmployeeRequest, EmployeeResponse, EmployeeQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'employees'
  }

  public uploadFiles(id: number, e: FormData): Observable<SingleEntity<string>> {
    return this.http.post<SingleEntity<string>>(`${this.uri}files/${id}`, e);
  }

  override store(e: FormData): Observable<SingleEntity<EmployeeResponse>> {
    return this.http.post<SingleEntity<EmployeeResponse>>(this.uri, e);
  }
}
