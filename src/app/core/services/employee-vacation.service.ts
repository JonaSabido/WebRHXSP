import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { EmployeeVacationChart, EmployeeVacationQueryFilter, EmployeeVacationRequest, EmployeeVacationResponse } from '../../interfaces/employee-vacation';
import { HttpClient } from '@angular/common/http';
import { List } from '../../interfaces/api-response';
import { Observable } from 'rxjs';

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

  public getGroupedByMonth(id_vacation_time: number): Observable<List<EmployeeVacationChart>> {
    return this.http.get<List<EmployeeVacationChart>>(`${this.uri}vacationtime/${id_vacation_time}`);
  }
}
