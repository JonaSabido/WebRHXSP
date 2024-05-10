import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ObjectFilter } from '../../../../shared/interfaces/object-filter';
import { VacationTimeQueryFilter, VacationTimeResponse } from '../../interfaces/vacation-time';
import { List } from '../../interfaces/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationTimeService extends ApiService {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'vacationtimes'
  }

  public all(filters?: ObjectFilter<VacationTimeQueryFilter>[]): Observable<List<VacationTimeResponse>> {
    const myFilters: ObjectFilter<VacationTimeQueryFilter>[] = filters ?? []
    return this.http.get<List<VacationTimeResponse>>(`${this.uri}`, { params: this.getParams(myFilters) });
  }

  protected getParams(filters: ObjectFilter<VacationTimeQueryFilter>[]): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    filters.forEach(element => {
      if (element.value !== '' && element.value !== null && element.value !== undefined) {
        httpParams = httpParams.set(element.property as string, element.value)
      }
    });
    return httpParams;
  }
}
