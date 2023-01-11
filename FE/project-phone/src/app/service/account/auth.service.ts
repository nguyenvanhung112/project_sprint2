import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {SignInForm} from "../../dto/sign-in-form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  signIn(value: any): Observable<any> {
    return this._httpClient.post<any>( 'http://localhost:8080/api/auth/signin', value);
  }
}
