import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { TypeLeaveQueryFilter, TypeLeaveRequest, TypeLeaveResponse } from '../../interfaces/type-leave';

@Injectable({
  providedIn: 'root'
})
export class TypeLeaveService extends ApiCrudService<TypeLeaveRequest, TypeLeaveResponse, TypeLeaveQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'typeleaves'
  }
}
