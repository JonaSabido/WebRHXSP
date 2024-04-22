import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { RecruitmentMethodQueryFilter, RecruitmentMethodRequest, RecruitmentMethodResponse } from '../../interfaces/recruitment-method';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentMethodService extends ApiCrudService<RecruitmentMethodRequest, RecruitmentMethodResponse, RecruitmentMethodQueryFilter>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'recruitmentmethods'
  }
}
