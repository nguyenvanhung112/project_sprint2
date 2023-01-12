import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from "../../../service/account/token.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private _tokenService: TokenService,
              private _router: Router,
              private _toast: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._tokenService.isLogged()) {
      const roles = this._tokenService.getRole();
      for (let i = 0; i < roles.length; i++) {
        if ((roles[i]) === 'ROLE_MEMBER') {
          return true;
        }
      }
      this._toast.error("Bạn không có quyền User")
      this._router.navigate(['']);
    } else {
      this._router.navigate(['login'])
    }
  }

}
