import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { ExtraTimeQueryFilter, ExtraTimeRequest, ExtraTimeResponse } from '../../interfaces/extra-time';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExtraTimeService extends ApiCrudService<ExtraTimeRequest, ExtraTimeResponse, ExtraTimeQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'extratimes'
  }
}
