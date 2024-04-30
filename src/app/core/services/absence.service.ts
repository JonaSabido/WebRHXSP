import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { AbsenceChartResponse, AbsenceQueryFilter, AbsenceRequest, AbsenceResponse } from '../../interfaces/absence';
import { HttpClient } from '@angular/common/http';
import { ObjectFilter } from '../../../../shared/interfaces/object-filter';
import { List } from '../../interfaces/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService extends ApiCrudService<AbsenceRequest, AbsenceResponse, AbsenceQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'absences'
  }

  public getGroup(filters: ObjectFilter<AbsenceQueryFilter>[]): Observable<List<AbsenceChartResponse>> {
    const myFilters: ObjectFilter<AbsenceQueryFilter>[] = filters ?? []
    return this.http.get<List<AbsenceChartResponse>>(`${this.uri}group`, { params: this.getParams(myFilters) });
  }
}
