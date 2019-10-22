import { HomeComponent } from './../home/home.component';
import { Component, Input, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import {EnterViewHomeReturn} from '../home/services/enter-view-home/enter-view-home-return';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdatePreferencesParameter} from '../home/services/update-preferences/update-preferences-parameter';
import {GetUserPhotosReturn, Photo} from '../home/services/get-user-photos/get-user-photos-return';
import {UploadPhotoParameter} from '../home/services/upload-photo/upload-photo-parameter';
import {DeletePhotoParameter} from '../home/services/delete-photo/delete-photo-parameter';
import {UpdatePreferencesReturn} from '../home/services/update-preferences/update-preferences-return';
import {UploadPhotoReturn} from '../home/services/upload-photo/upload-photo-return';
import {DeletePhotoReturn} from '../home/services/delete-photo/delete-photo-return';
import {MessageService} from 'primeng/api';
import {UploadPhotoService} from '../home/services/upload-photo/upload-photo.service';
import {DeletePhotoService} from '../home/services/delete-photo/delete-photo.service';
import {UpdatePreferencesService} from '../home/services/update-preferences/update-preferences.service';
import {LoginService} from '../landing-page/services/login/login.service';
import {GetTagsService} from './services/get-tags/get-tags.service';
import {GetTagsReturn, Tag} from './services/get-tags/get-tags-return';
import {AddUserTagService} from './services/add-user-tag/add-user-tag.service';
import {AddUserTagReturn} from './services/add-user-tag/add-user-tag-return';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { GetUserTagsService } from './services/get-user-tags/get-user-tags.service';
import { GetUserTagsReturn, UserTag } from './services/get-user-tags/get-user-tags.return';
import { RemoveUserTagService } from './services/remove-user-tag/remove-user-tag.service';
import { RemoveUserTagReturn } from './services/remove-user-tag/remove-user-tag.return';
import * as $ from 'jquery';
import { SaveUserLastConnectionParameter } from '../home/services/save-last-connection/save-last-connection-parameter';
import { GetUserOnlineParameter } from '../home/services/get-user-online/get-user-online-parameter';
import { GetUserOnlineService } from '../home/services/get-user-online/get-user-online.service';
import { SaveUserLastConnectionService } from '../home/services/save-last-connection/save-last-connection.service';
import { GetPreferenceTagsService } from './services/get-preference-tags/get-preference-tags.service';
import { GetPreferenceTagsReturn, PrefTag } from './services/get-preference-tags/get-preference-tags.return';
import { AddPrefTagService } from './services/add-pref-tag/add-pref-tag.service';
import { AddPrefTagReturn } from './services/add-pref-tag/add-pref-tag.return';
import { RemovePrefTagService } from './services/remove-pref-tag/remove-pref-tag.service';
import { RemovePrefTagReturn } from './services/remove-pref-tag/remove-pref-tag.return';

declare var $: any;

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  @Output() updateResolveDataHome = new EventEmitter<EnterViewHomeReturn>();
  @Output() updateEvent = new EventEmitter<string>();
  @Output() updatePhotos = new EventEmitter<string>();
  /**
   *  Resolve data for the view
   *
   */
  @Input() resolveData: EnterViewHomeReturn = null;
  /**
   * Update form preferences
   *
   */
  public prefForm: FormGroup;
  /**
   * Age preference range
   *
   */
  public ageRange: number[] = [18, 55];
  /**
   * Distance preference
   *
   */
  public distance: number;
  /**
   * Expected data for the servers
   *
   */
  public APIParameterPref: UpdatePreferencesParameter;
  /**
   * UserPhotos tab
   *
   */
  @Input() userPhotos: Photo[] = null;
  /**
   * Selected photo to upload
   *
   */
  public selectedFile: string;
  /**
   * Expected data for upload photo
   *
   */
  public APIParameterPhoto: UploadPhotoParameter;
  /**
   * Delete photo expected data
   *
   */
  public APIParameterDelPhoto: DeletePhotoParameter;
  /**
   * All tags
   *
   */
  public tags: Tag[] = [];
  /**
   * User selected tags
   *
   */
  public userTags: UserTag[] = [];
  /**
   * User selected tags
   *
   */
  public prefTags: PrefTag[] = [];
  /**
   * User id
   *
   */
  public userId: number = null;
  /**
   *
   * Popularity preference
   */
  public popularity: number = null;
  /**
   *
   * Tags in common
   */
  public tagsInCommon: number = null;

  public APIParameterGetUserOnline: GetUserOnlineParameter;
  public APIParameterSaveUserLastConnection: SaveUserLastConnectionParameter;

  isSelectedTag(idTag: number) {
    let find = false;
    for (let i = 0; i < this.userTags.length; i++) {
      if (this.userTags[i].id_tag === idTag) {
        find = true;
      }
    }
    return (find) ? true : false;
  }

  isSelectedPrefTag(idTag: number) {
    let find = false;
    for (let i = 0; i < this.prefTags.length; i++) {
      if (this.prefTags[i].id_tag === idTag) {
        find = true;
      }
    }
    return (find) ? true : false;
  }

  addUserTag(tag: Tag) {
    this.addUserTagService.addUserTag({id_tag: tag.id_tag, id_user: this.userId})
      .subscribe((result: AddUserTagReturn) => {
        if (result.success) {
          this.userTags.push({
            id_utag: result.id_utag,
            id_tag: tag.id_tag,
            id_user: this.userId,
            label: tag.label,
            tag: tag.tag
          });
        }
      });
  }

 async addPrefTag(tag: Tag) {
    this.addPrefTagService.addPrefTag({id_tag: tag.id_tag, id_user: this.userId})
      .subscribe(async (result: AddPrefTagReturn) => {
        if (result.success) {
          this.prefTags.push({
            id_tpref: result.id_tpref,
            id_tag: tag.id_tag,
            id_user: this.userId,
            tag: tag.tag
          });
          await this.updateEvent.next('');
        }
      });
  }

  removeUserTag(idTag: number) {
    this.removeUserTagService.removeUserTag(this.getUserTagId(idTag))
      .subscribe((result: RemoveUserTagReturn) => {
        if (result.success) {
          this.userTags.splice(this.getUserTagIndex(idTag), 1);
        }
      });
  }

  async removePrefTag(idTag: number, index: number) {
    let prefTagId: number;
    let prefTagIndex: number;
    this.prefTags.forEach((v) => {
      if (v.id_tag === idTag) {
        prefTagId = v.id_tpref;
      }
    });
    this.prefTags.forEach((v, i) => {
      if (v.id_tag === idTag) {
        prefTagIndex = i;
      }
    });
    this.removePrefTagService.removePrefTag(prefTagId)
      .subscribe(async (result: RemovePrefTagReturn) => {
        if (result.success) {
          this.prefTags.splice(prefTagIndex, 1);
          await this.updateEvent.next('');
        }
      });
  }

  displayTags() {
    this.getTagsService.getTags()
      .subscribe((result: GetTagsReturn) => {
        if (result.success) {
          this.tags = result.tags;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Network',
            detail: 'Check your connection',
            life: 6000
          });
        }
      });
  }

  getUserOnline(online) {
    this.APIParameterGetUserOnline = {
      userId: +localStorage.getItem('userId'),
      online
    };
    this.getUserOnlineService.getUserOnline(this.APIParameterGetUserOnline).subscribe();
  }
  saveUserLastConnection(date) {
    this.APIParameterSaveUserLastConnection = {
        userId: +localStorage.getItem('userId'),
        date
      };
    this.saveUserLastConnectionService.saveUserLastConnection(this.APIParameterSaveUserLastConnection).subscribe();
  }

  logOut() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    const date = new Date();
    this.saveUserLastConnection(date);
    this.getUserOnline(0);
    this.loginService.logOut();
  }

  async updatePref() {
    if (this.prefForm.valid) {
      this.APIParameterPref = {
        id: this.userId,
        bio: this.prefForm.get('bio').value,
        gender: this.prefForm.get('gender').value,
        interest: this.prefForm.get('interest').value,
        distance: this.distance,
        minage: this.ageRange[0],
        maxage: this.ageRange[1],
        pop: this.popularity,
        tagsInCommon: this.tagsInCommon
      };
      await this.updatePreferencesService.updatePreferences(this.APIParameterPref)
        .subscribe(async (result: UpdatePreferencesReturn) => {
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Update',
              detail: 'Preference updated successfully',
              life: 6000,
            });
            const updateResolveDataHome = this.resolveData;
            updateResolveDataHome.distance = this.APIParameterPref.distance;
            updateResolveDataHome.minage = this.APIParameterPref.minage;
            updateResolveDataHome.maxage = this.APIParameterPref.maxage;
            updateResolveDataHome.pop = this.APIParameterPref.pop;
            try {
              await this.updateResolveDataHome.next(updateResolveDataHome);
            } catch (err) {
              throw err;
            } finally {
              await this.updateEvent.next('');
            }
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Network',
              detail: 'Check your connection',
              life: 6000,
            });
          }
        });
    }
  }

  uploadPhoto() {
    this.APIParameterPhoto = {
      id: this.userId,
      photo: this.selectedFile,
      active: false,
    };
    if (this.selectedFile && this.userPhotos.length < 5) {
      this.uploadPhotoService.uploadPhoto(this.APIParameterPhoto)
        .subscribe((result: UploadPhotoReturn) => {
          if (result.success) {
            this.userPhotos.push({
              id_photo: result.id,
              id_user: this.userId,
              photo: this.selectedFile,
              active: false,
              ts: 10,
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Update',
              detail: result.message,
              life: 6000,
            });
            this.selectedFile = null;
            if (this.userPhotos.length === 1) {
              this.updatePhotos.next('');
            }
          }
        });
    } else if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Upload picture',
        detail: 'You cannot import empty pictures',
        life: 6000,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Upload',
        detail: 'You can upload only 5 pictures, choose the bests',
        life: 6000,
      });
    }
  }

  onFileChanged(e) {
    const self = this;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      self.selectedFile = reader.result.toString();
    };
  }

  deletePhoto(idPhoto, idUser, index) {
    this.APIParameterDelPhoto = {
      id_photo: idPhoto,
      id_user: idUser
    };
    this.deletePhotoService.deletePhoto(this.APIParameterDelPhoto)
      .subscribe((result: DeletePhotoReturn) => {
        if (result.success) {
          this.userPhotos.splice(index, 1);
          if (this.userPhotos.length === 0) {
            this.updatePhotos.next('');
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Network',
            detail: 'Check your connection',
            life: 6000,
          });
        }
      });
  }

  getUserTags() {
    this.getUserTagsService.getUserTags(this.userId)
      .subscribe((result: GetUserTagsReturn) => {
        if (result.success) {
          this.userTags = result.userTags;
        }
      });
  }

  getUserTagsPref() {
    this.getPreferenceTagsService.getPreferenceTags(this.userId)
      .subscribe((result: GetPreferenceTagsReturn) => {
        if (result.success) {
          this.prefTags = result.prefTags;
        }
      });
  }

  getUserTagId(idTag: number): number {
    for (let i = 0; i < this.userTags.length; i++) {
      if (this.userTags[i].id_tag === idTag) {
        return (this.userTags[i].id_utag);
      }
    }
  }

  getUserTagIndex(idTag: number): number {
    for (let i = 0; i < this.userTags.length; i++) {
      if (this.userTags[i].id_tag === idTag) {
        return (i);
      }
    }
  }

  constructor(public router: Router,
              public messageService: MessageService,
              public activatedRoute: ActivatedRoute,
              public uploadPhotoService: UploadPhotoService,
              public deletePhotoService: DeletePhotoService,
              public addUserTagService: AddUserTagService,
              public addPrefTagService: AddPrefTagService,
              public getTagsService: GetTagsService,
              public getPreferenceTagsService: GetPreferenceTagsService,
              public removeUserTagService: RemoveUserTagService,
              public getUserTagsService: GetUserTagsService,
              public updatePreferencesService: UpdatePreferencesService,
              public getUserOnlineService: GetUserOnlineService,
              public removePrefTagService: RemovePrefTagService,
              public saveUserLastConnectionService: SaveUserLastConnectionService,
              public fb: FormBuilder,
              public loginService: LoginService) {

    this.prefForm = fb.group({
      bio: [''],
      gender: ['', Validators.required],
      interest: ['', Validators.required],
    });
  }

  initVariables() {
    this.ageRange[0] = this.resolveData.minage;
    this.ageRange[1] = this.resolveData.maxage;
    this.popularity = this.resolveData.pop;
    this.distance = this.resolveData.distance;
    this.userId = this.resolveData.id;
    if (this.resolveData.bio) {
      this.prefForm.get('bio').setValue(this.resolveData.bio);
    }
    this.prefForm.get('gender').setValue(this.resolveData.gender);
    this.prefForm.get('interest').setValue(this.resolveData.interest);
  }

  ngOnInit() {
    this.displayTags();
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    this.initVariables();
    this.getUserTagsPref();
    this.getUserTags();
  }
}
