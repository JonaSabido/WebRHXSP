import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { AreaQueryFilter, AreaRequest, AreaResponse } from '../../interfaces/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends ApiCrudService<AreaRequest, AreaResponse, AreaQueryFilter>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'areas'
  }
}
