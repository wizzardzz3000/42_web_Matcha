import {CanActivate, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {LoginService} from '../landing-page/services/login/login.service';
import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(public router: Router,
              public loginService: LoginService,
              public messageService: MessageService) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      if (this.loginService.isLoggedIn()) {
        return true;
      } else {
        localStorage.removeItem('token');
        this.messageService.add({
          severity: 'error',
          summary: 'Login',
          detail: 'Session expired',
          life: 6000
        });
        this.router.navigate(['/']);
        return false;
      }
    } else {
      // The token doesn't exist in browser memory
      this.router.navigate(['/']);
      this.messageService.add({
        severity: 'error',
        summary: 'Login',
        detail: 'Please log in or register to access to this page',
        life: 6000
      });
      return false;
    }
  }
}
