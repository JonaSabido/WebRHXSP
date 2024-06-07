import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../../interfaces/api-response';
import { NotificationUserResponse } from '../../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ApiService {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'notificationusers'
  }

  public getByUser(id_user: number): Observable<List<NotificationUserResponse>> {
    return this.http.get<List<NotificationUserResponse>>(`${this.uri}`, { params: { id_user: id_user } });
  }

  public changeStatus(id: number, status: boolean): Observable<NotificationUserResponse> {
    return this.http.put<NotificationUserResponse>(`${this.uri}/${id}`, { status: status });
  }
}
