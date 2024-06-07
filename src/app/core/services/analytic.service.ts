import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List, SingleEntity } from '../../interfaces/api-response';
import { AnalyticResponse, EventMonth, TotalData } from '../../interfaces/analytic';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService extends ApiService {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'analytics'
  }

  public getTotalData(): Observable<SingleEntity<TotalData>> {
    return this.http.get<SingleEntity<TotalData>>(`${this.uri}totaldata`);
  }

  public getEventsByMonth(): Observable<List<EventMonth>> {
    return this.http.get<List<EventMonth>>(`${this.uri}eventsbymonth`);
  }

  public getLeavesByMonth(month: number, year: number): Observable<List<AnalyticResponse>> {
    return this.http.get<List<AnalyticResponse>>(`${this.uri}leavesbymonth?month=${month}&year=${year}`);
  }

  public getEntriesByMonth(month: number, year: number): Observable<List<AnalyticResponse>> {
    return this.http.get<List<AnalyticResponse>>(`${this.uri}entriesbymonth?month=${month}&year=${year}`);
  }

  public getRecruitmentsByMonth(month: number, year: number): Observable<List<AnalyticResponse>> {
    return this.http.get<List<AnalyticResponse>>(`${this.uri}recruitmentsbymonth?month=${month}&year=${year}`);
  }

  public getValidationsByMonth(month: number, year: number): Observable<List<AnalyticResponse>> {
    return this.http.get<List<AnalyticResponse>>(`${this.uri}validationsbymonth?month=${month}&year=${year}`);
  }

  public getTypeLeavesByMonth(month: number, year: number): Observable<List<AnalyticResponse>> {
    return this.http.get<List<AnalyticResponse>>(`${this.uri}typeleavesbymonth?month=${month}&year=${year}`);
  }

  public getActiveTimesByMonth(month: number, year: number): Observable<List<AnalyticResponse>> {
    return this.http.get<List<AnalyticResponse>>(`${this.uri}activetimesbymonth?month=${month}&year=${year}`);
  }
}
