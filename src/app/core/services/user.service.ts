import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from '../../../../shared/services/api-crud.service';
import { UserQueryFilter, UserRequest, UserResponse } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiCrudService<UserRequest, UserResponse, UserQueryFilter> {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'users'
  }
}
