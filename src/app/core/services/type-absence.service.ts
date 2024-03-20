import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { TypeAbsenceRequest, TypeAbsenceResponse } from '../../interfaces/type-absence';

@Injectable({
  providedIn: 'root'
})
export class TypeAbsenceService extends ApiCrudService<TypeAbsenceRequest, TypeAbsenceResponse>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'typeabsences'
  }
}
