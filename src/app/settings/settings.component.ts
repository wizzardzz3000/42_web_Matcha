import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateEmailParameter } from './services/update-email/update-email-parameter';
import { UpdateEmailReturn } from './services/update-email/update-email-return';
import { UpdateEmailService } from './services/update-email/update-email.service';
import { UpdateNameParameter } from './services/update-name/update-name-parameter';
import { UpdateNameReturn } from './services/update-name/update-name-return';
import { UpdateNameService } from './services/update-name/update-name.service';
import { UpdatePasswordParameter } from './services/update-password/update-password-parameter';
import { UpdatePasswordReturn } from './services/update-password/update-password-return';
import { UpdatePasswordService } from './services/update-password/update-password.service';
import { EnterViewHomeReturn } from '../home/services/enter-view-home/enter-view-home-return';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  public resolvedData: EnterViewHomeReturn;
  public changeNameForm: FormGroup;
  public changeEmailForm: FormGroup;
  public changePasswordForm: FormGroup;
  public UpdateNameAPIParameter: UpdateNameParameter;
  public UpdateEmailAPIParameter: UpdateEmailParameter;
  public UpdatePasswordAPIParameter: UpdatePasswordParameter;

  constructor(public activatedRoute: ActivatedRoute,
              public updateNameService: UpdateNameService,
              public updateEmailService: UpdateEmailService,
              public updatePasswordService: UpdatePasswordService,
              public messageService: MessageService,
              public fb: FormBuilder) {
    this.changeNameForm = fb.group({
      newFirstName: [],
      newLastName: [],
  });
    this.changeEmailForm = fb.group({
      newEmail: ['', Validators.required]
    });
    this.changePasswordForm = fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.minLength(8)],
      newPasswordConfirmation: ['', Validators.minLength(8)]
    });
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn }) => {
      this.resolvedData = data.viewData;
    });
    this.checkAccountConfirmed(this.resolvedData);
  }

  updateEmail() {
    if (this.changeEmailForm.valid) {
      // tslint:disable-next-line: max-line-length
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.changeEmailForm.get('newEmail').value)) {
        this.UpdateEmailAPIParameter = {
          newEmail: this.changeEmailForm.get('newEmail').value,
          idUser: this.resolvedData.id
        };
        this.updateEmailService.updateEmail(this.UpdateEmailAPIParameter)
        .subscribe((result: UpdateEmailReturn) => {
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Your email address has been updated :)',
              life: 6000
            });
          }
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Incorrect email format',
          detail: 'Please enter a valid email address',
          life: 6000
        });
      }
    }
  }
  updateName() {
    if (this.changeNameForm.valid) {
      this.UpdateNameAPIParameter = {
        newFirstName: this.changeNameForm.get('newFirstName').value,
        newLastName: this.changeNameForm.get('newLastName').value,
        idUser: this.resolvedData.id
      };
    }
    this.updateNameService.updateName(this.UpdateNameAPIParameter)
        .subscribe((result: UpdateNameReturn) => {
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Your name has been changed :)',
              life: 6000
            });
          }
        });
  }
  updatePassword() {
    if (this.changePasswordForm.valid) {
      // tslint:disable-next-line: max-line-length
      if (/^[a-z][a-z0-9]+$/.test(this.changePasswordForm.get('newPassword').value) && (this.changePasswordForm.get('newPassword').value.length > 8)) {
        this.UpdatePasswordAPIParameter = {
          currentPassword: this.changePasswordForm.get('currentPassword').value,
          newPassword: this.changePasswordForm.get('newPassword').value,
          newPasswordConfirmation: this.changePasswordForm.get('newPasswordConfirmation').value,
          idUser: this.resolvedData.id
        };
        if (this.changePasswordForm.get('newPassword').value === this.changePasswordForm.get('newPasswordConfirmation').value) {
          this.updatePasswordService.updatePassword(this.UpdatePasswordAPIParameter)
            .subscribe((result: UpdatePasswordReturn) => {
              if (result.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: result.message,
                  life: 6000
                });
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Oops',
                  detail: result.message,
                  life: 6000
                });
              }
            });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Security',
            detail: 'Passwords don\'t match',
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
    }
  }

  checkAccountConfirmed(data) {
    if (data.confirm === 1) {
      return 1;
    }
  }
}
