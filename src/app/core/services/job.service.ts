import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { JobRequest, JobResponse } from '../../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class JobService extends ApiCrudService<JobRequest, JobResponse>{

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'jobs'
  }
}
