import {CanActivate, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {LoginService} from '../landing-page/services/login/login.service';
import {Injectable} from '@angular/core';

@Injectable()
export class IsLoggedOutGuard implements CanActivate {
  constructor(public router: Router,
              public loginService: LoginService,
              public messageService: MessageService) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
