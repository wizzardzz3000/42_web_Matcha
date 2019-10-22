import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginParameter } from './services/login/login.parameter';
import { LoginReturn } from './services/login/login.return';
import { LoginService } from './services/login/login.service';
import { MailParameter } from './services/mail/mail.parameter';
import { MailReturn } from './services/mail/mail.return';
import { MailService } from './services/mail/mail.service';
import { RegisterParameter } from './services/register/register.parameter';
import { RegisterService } from './services/register/register.service';
import { RegisterReturn } from './services/register/register.return';
import { ActivateService } from './services/activate/activate.service';
import { EnterViewActivateReturn } from './services/enter-view-activate/enter-view-activate-return';
import { ActivateReturn } from './services/activate/activate.service-return';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { splitAtColon } from '@angular/compiler/src/util';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { GeolocationReturn } from './services/geolocation/geolocation.return';
import { GeolocationParameter } from './services/geolocation/geolocation.parameter';
import * as $ from 'jquery';
import { GetUserOnlineParameter } from '../home/services/get-user-online/get-user-online-parameter';
import { GetUserOnlineService } from '../home/services/get-user-online/get-user-online.service';
import { GetUserOnlineReturn } from '../home/services/get-user-online/get-user-online-return';
import { ResetPasswordParameter } from './services/reset-password/reset-password.parameter';
import { ResetPasswordReturn } from './services/reset-password/reset-password.return';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { CheckKeyService } from './services/check-key/check-key.service';
import { CheckKeyReturn } from './services/check-key/check-key.return';
import { SaveNewPasswordParameter } from './services/save-new-password/save-new-password.parameter';
import { SaveNewPasswordReturn } from './services/save-new-password/save-new-password.return';
import { SaveNewPasswordService } from './services/save-new-password/save-new-password.service';
import { IpLocationService } from './services/ip-location/ip-location.service';
import { IpLocationReturn } from './services/ip-location/ip-location.return';
import { OauthService } from './services/oauth/oauth.service';
import { OauthParameter } from './services/oauth/oauth.parameter';

declare var $: any;
declare var FB: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  /**
   * Register form
   *
   */
  public registerForm: FormGroup;
  /**
   * Login form
   *
   */
  public loginForm: FormGroup;
  /**
   * Type interface of register data structure
   *
   */
  public RegisterAPIParameter: RegisterParameter;
  /**
   * Type interface of login data structure
   *
   */
  public LoginAPIParameter: LoginParameter;
  /**
   * User geolocation
   */
  public latitude: number;
  public longitude: number;
  public MailAPIParameter: MailParameter;
  public resolvedData: EnterViewActivateReturn;
  public bsValue: Date = new Date();
  public datePickerConfig: Partial<DatepickerConfig>;
  public APIParameterGetUserOnline: GetUserOnlineParameter;

  public forgotModeVar = 0;
  public readyToResetPassword = 0;
  public forgotPasswordForm: FormGroup;
  public resetPasswordForm: FormGroup;
  public ResetPasswordAPIParameter: ResetPasswordParameter;
  public SaveNewPasswordAPIParameter: SaveNewPasswordParameter;
  public paramEmail: string;
  public paramKey: string;

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, error => {
        if (error) {
          this.ipLocationService.ipLocation().subscribe((result: IpLocationReturn) => {
            if (result.latitude) {
              this.latitude = result.latitude;
              this.longitude = result.longitude;
            }
          });
        }
      });
    }
  }

  sendGeolocation(id_user: number) {
    const APIParameter: GeolocationParameter = {
      id_user,
      latitude: this.latitude,
      longitude: this.longitude
    };
    this.geolocationService.sendPosition(APIParameter).subscribe();
  }

  login() {
    if (this.loginForm.valid) {
      this.LoginAPIParameter = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.loginService.auth(this.LoginAPIParameter)
        .subscribe((result: LoginReturn) => {
          if (result.success) {
            // Connect successfully let's store the token
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.user_id.toString());
            this.getUserOnline(1);
            this.sendGeolocation(result.user_id);
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            this.router.navigate(['/home']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: result.message,
              life: 6000
            });
          }
        });
    }
  }

  getUserOnline(online) {
    this.APIParameterGetUserOnline = {
      userId: +localStorage.getItem('userId'),
      online
    };
    this.getUserOnlineService.getUserOnline(this.APIParameterGetUserOnline)
      .subscribe();
  }

  dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }
  generateId(len) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join('');
  }

  checkPassword(password: string) {
    if (/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(this.registerForm.get('password').value) && (this.registerForm.get('password').value.length >= 8)) {
      return (1);
    } else if (/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password) && (password.length >= 8)) {
      return (1);
    } else {
      return (0);
    }
  }
  checkEmail(email) {
    // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  register() {
    if (this.registerForm.valid) {
      if (this.checkPassword(this.registerForm.get('password').value)) {
        if (this.checkEmail(this.registerForm.get('email').value)) {
          const key = this.generateId(80);
          this.RegisterAPIParameter = {
            firstname: this.registerForm.get('firstname').value,
            lastname: this.registerForm.get('lastname').value,
            email: this.registerForm.get('email').value,
            birthdate: this.registerForm.get('birthdate').value.toISOString().slice(0, 10),
            password: this.registerForm.get('password').value,
            passwordConfirmation: this.registerForm.get('passwordConfirmation').value,
            gender: this.registerForm.get('gender').value,
            key
          };
          this.MailAPIParameter = {
            firstname: this.registerForm.get('firstname').value,
            email: this.registerForm.get('email').value,
            key
          };
          this.registerService.register(this.RegisterAPIParameter)
            .subscribe((result: RegisterReturn) => {
              if (result.success) {
                this.sendGeolocation(result.user_id);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Register',
                  detail: result.message,
                  life: 6000
                });
                $('#modRegister').modal('hide');
              } else {
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Email',
                  detail: result.message,
                  life: 6000
                });
              }
            });
          this.mailService.sendMail(this.MailAPIParameter).subscribe();
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Incorrect email format',
            detail: 'Please enter a valid email address',
            life: 6000
          });
        }
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Incorrect password format',
          detail: 'Please enter a password containing at least one number and 8 characters',
          life: 6000
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty fields',
        detail: 'Please fill all the inputs',
        life: 6000
      });
    }
  }

  checkAccount(data) {
    const email = this.activatedRoute.snapshot.paramMap.get('email');
    const key = this.activatedRoute.snapshot.paramMap.get('key');

    if (data.email === email && data.key === key && data.confirm === 0) {
      this.verifyAccount(email);
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Welcome',
        detail: 'This account is already confirmed, you may login with your credentials :)',
        life: 6000
      });
    }
  }

  forgotMode() {
    if (this.forgotModeVar === 0) {
      this.forgotModeVar = 1;
    } else {
      this.forgotModeVar = 0;
    }
  }

  askForPasswordReset() {
    if (this.forgotPasswordForm.valid) {
      const key = this.generateId(80);
      this.ResetPasswordAPIParameter = {
        email: this.forgotPasswordForm.get('email').value,
        key,
        function: 'sendMail',
      };
      this.resetPasswordService.sendLink(this.ResetPasswordAPIParameter)
        .subscribe((result: ResetPasswordReturn) => {
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'See you again soon',
              detail: 'Check your mail to reset your password :)',
              life: 6000
            });
            $('#modSignIn').modal('hide');
            this.forgotModeVar = 0;
          } else {
          }
        });
    }
  }

  resetPassword(email, key) {
    this.checkKeyService.checkKey(email)
      .subscribe((result: CheckKeyReturn) => {
        if (result.success) {
          if (result.key === key) {
            this.readyToResetPassword = 1;
            $('#modResetPwd').modal('show');
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Oops :/',
              detail: 'The link you followed is obsolete, please ask for another password reset link',
              life: 6000
            });
          }
        }
      });
  }

  saveNewPassword() {
    if (this.resetPasswordForm.valid &&
      (this.resetPasswordForm.get('newPassword').value === this.resetPasswordForm.get('newPasswordConfirmation').value)) {
      if (this.checkPassword(this.resetPasswordForm.get('newPassword').value)) {
        this.SaveNewPasswordAPIParameter = {
          email: this.activatedRoute.snapshot.paramMap.get('email'),
          newPassword: this.resetPasswordForm.get('newPassword').value,
        };
        this.saveNewPasswordService.saveNewPassword(this.SaveNewPasswordAPIParameter)
          .subscribe((result: SaveNewPasswordReturn) => {
            if (result.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Welcome',
                detail: 'Password updated! You can now login :)',
                life: 6000
              });
              $('#modResetPwd').modal('hide');
              this.destroyKey(this.activatedRoute.snapshot.paramMap.get('email'));
              $('#modSignIn').modal('show');
            }
          });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Incorrect password format',
          detail: 'Please enter a password containing at least one number and 8 characters',
          life: 6000
        });
      }
    }
  }

  destroyKey(email) {
    const key = this.generateId(80);
    this.ResetPasswordAPIParameter = {
      email,
      key,
      function: 'none',
    };
    this.resetPasswordService.sendLink(this.ResetPasswordAPIParameter)
      .subscribe();
  }

  verifyAccount(email) {
    this.activateService.activateAccount(email)
      .subscribe((result: ActivateReturn) => {
        if (result.success) {
          $('#modSignIn').modal('show');
          this.messageService.add({
            severity: 'success',
            summary: 'Welcome',
            detail: 'Account successfully activated! You can now login :)',
            life: 6000
          });
        }
      });
  }



  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              public router: Router,
              public registerService: RegisterService,
              public loginService: LoginService,
              private messageService: MessageService,
              private mailService: MailService,
              public activatedRoute: ActivatedRoute,
              public geolocationService: GeolocationService,
              public activateService: ActivateService,
              public getUserOnlineService: GetUserOnlineService,
              public resetPasswordService: ResetPasswordService,
              public checkKeyService: CheckKeyService,
              public ipLocationService: IpLocationService,
              public oauthService: OauthService,
              public saveNewPasswordService: SaveNewPasswordService) {
    this.registerForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', Validators.minLength(8)],
      passwordConfirmation: ['', Validators.minLength(8)],
      gender: ['', Validators.required],
    });

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.forgotPasswordForm = fb.group({
      email: ['', Validators.required],
    });

    this.resetPasswordForm = fb.group({
      newPassword: ['', Validators.minLength(8)],
      newPasswordConfirmation: ['', Validators.minLength(8)],
    });

    this.datePickerConfig = Object.assign({
      containerClass: 'theme-orange',
      showWeekNumbers: false,
      maxDate: new Date(),
    });
    this.route.queryParams.subscribe(params => {
      this.paramEmail = params.email;
      this.paramKey = params.key;
    });
  }

  facebookAuth() {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'id,name,birthday,first_name,last_name,email,gender' }, (response) => {
          const APIParameter: OauthParameter = {
            id_facebook: +response.id,
            firstname: response.first_name,
            lastname: response.last_name,
            email: response.email,
            gender: response.gender,
            birthdate: new Date()
          };
          this.oauthService.oauth(APIParameter)
            .subscribe((result) => {
              if (result.success) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.id_user.toString());
                this.getUserOnline(1);
                this.sendGeolocation(result.id_user);
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                this.router.navigate(['/home']);
              }
            });
        });
      }
    });
  }

  ngOnInit() {
    if (this.router.url.split('/')[1] === 'activate' &&
      this.activatedRoute.snapshot.paramMap.get('email') &&
      this.activatedRoute.snapshot.paramMap.get('key')) {
      this.activatedRoute.data.forEach((data: { viewData: EnterViewActivateReturn }) => {
        this.resolvedData = data.viewData;
      });
      this.checkAccount(this.resolvedData);
    }
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: '412626469601871',
        cookie: false,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/fr_FR/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    if (this.router.url.split('/')[1] === 'resetPassword' &&
      this.activatedRoute.snapshot.paramMap.get('email') &&
      this.activatedRoute.snapshot.paramMap.get('key')) {
      this.resetPassword(this.activatedRoute.snapshot.paramMap.get('email'), this.activatedRoute.snapshot.paramMap.get('key'));
    }
    this.registerForm.get('gender').setValue('Female');
    this.getLocation();
  }
}
