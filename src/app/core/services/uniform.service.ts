import { Injectable } from '@angular/core';
import { UniformQueryFilter, UniformRequest, UniformResponse } from '../../interfaces/uniform';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniformService extends ApiCrudService<UniformRequest, UniformResponse, UniformQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'uniforms'
  }
  
}
