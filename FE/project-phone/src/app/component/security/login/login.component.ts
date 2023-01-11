import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/account/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../service/account/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rflogin: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _tokenService:TokenService) { }

  ngOnInit(): void {
    this.getFormLogin();
  }
  getFormLogin(){
    this.rflogin = this._formBuilder.group({
      username:[],
      password:[],
      rememberMe: [false]
    })
  }
  login() {
    this._authService.signIn(this.rflogin.value).subscribe(data => {
      if (data.token != undefined) {
        console.log(data);
        if (this.rflogin.value.rememberMe) {
          this._tokenService.rememberMe(data.token, data.account, data.roles, data.user)
        } else {
          this._tokenService.setAccountSession(data.account);
          this._tokenService.setTokenSession(data.token);
          this._tokenService.setUserSession(data.user);
          this._tokenService.setRoleSession(data.roles)
        }

        this._router.navigate(['']).then(() => {
          location.reload();
        })
      }
    })
  }
}
