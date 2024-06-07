import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private tokenName: string = 'token_app_rhxsp'

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  root(): string {
    return 'auth'
  }

  public login(body: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.uri}login`, body);
  }

  public getTokenOnStorage(): string {
    return localStorage.getItem(this.tokenName) || ''
  }

  public setTokenOnStorage(tokenValue: string): void {
    localStorage.setItem(this.tokenName, tokenValue)
  }

  public removeTokenOnStorage(tokenValue: string): void {
    localStorage.removeItem(this.tokenName)
  }
  
}
