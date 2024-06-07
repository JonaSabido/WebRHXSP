import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { AntidopingQueryFilter, AntidopingRequest, AntidopingResponse } from '../../interfaces/antidoping';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AntidopingService extends ApiCrudService<AntidopingRequest, AntidopingResponse, AntidopingQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'antidopings'
  }

}
