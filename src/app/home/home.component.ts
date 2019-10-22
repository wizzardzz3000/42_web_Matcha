import { async } from '@angular/core/testing';
import { PreferencesComponent } from './../preferences/preferences.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {ActivatedRoute} from '@angular/router';
import {GetUserPhotosReturn, Photo} from './services/get-user-photos/get-user-photos-return';
import {GetUserPhotosService} from './services/get-user-photos/get-user-photos.service';
import {MessageService} from 'primeng/api';
import { GetUserToSwipeService } from './services/get-user-to-swipe/get-user-to-swipe.service';
import { GetUserToSwipeParameter } from './services/get-user-to-swipe/get-user-to-swipe-parameter';
import { GetUserToSwipeReturn } from './services/get-user-to-swipe/get-user-to-swipe-return';
import { ChatComponent } from '../chat/chat.component';
import { SwipeParameter } from './services/swipe/swipe-parameter';
import { SwipeService } from './services/swipe/swipe.service';
import { SwipeReturn } from './services/swipe/swipe-return';
import {} from 'googlemaps';
import { GetUserTagsReturn, UserTag } from '../preferences/services/get-user-tags/get-user-tags.return';
import { GetUserTagsService } from '../preferences/services/get-user-tags/get-user-tags.service';
import * as $ from 'jquery';
import { GetUserOnlineService } from './services/get-user-online/get-user-online.service';
import { GetUserOnlineParameter } from './services/get-user-online/get-user-online-parameter';
import { GetUserOnlineReturn } from './services/get-user-online/get-user-online-return';
import { SaveUserLastConnectionParameter } from './services/save-last-connection/save-last-connection-parameter';
import { SaveUserLastConnectionService } from './services/save-last-connection/save-last-connection.service';
import { SaveUserLastConnectionReturn } from './services/save-last-connection/save-last-connection-return';
import { LastConnectedTimeFormatPipe } from '../pipes/last-connection.pipe';
import anime from 'animejs/lib/anime.es.js';
import { GetTheHeavensParameter } from './services/get-the-heavens/get-the-heavens-parameter';
import { GetTheHeavensService } from './services/get-the-heavens/get-the-heavens.service';
import { GetTheHeavensReturn } from './services/get-the-heavens/get-the-heavens-return';
import { SocketNotificationsService } from '../notifications/services/socket-notifications/socket-notifications.service';
import { Notification } from '../notifications/services/get-notifications/get-notifications.return';
import { IpLocationReturn } from '../landing-page/services/ip-location/ip-location.return';
import { IpLocationService } from '../landing-page/services/ip-location/ip-location.service';
import { ReportUserService } from '../chat/services/report-user/report-user.service';
import { ReportUserNotMatchedParameter } from './services/report-user-not-matched/report-user-not-matched.parameter';
import { ReportUserNotMatchedService } from './services/report-user-not-matched/report-user-not-matched.service';
import { ReportUserNotMatchedReturn } from './services/report-user-not-matched/report-user-not-matched.return';
import { GetPreferenceTagsService } from '../preferences/services/get-preference-tags/get-preference-tags.service';
import { PrefTag, GetPreferenceTagsReturn } from '../preferences/services/get-preference-tags/get-preference-tags.return';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ LastConnectedTimeFormatPipe ],
})
export class HomeComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
              public getUserPhotosService: GetUserPhotosService,
              public getUserToSwipeService: GetUserToSwipeService,
              public getUserTagsService: GetUserTagsService,
              public swipeService: SwipeService,
              public messageService: MessageService,
              public getUserOnlineService: GetUserOnlineService,
              public saveUserLastConnectionService: SaveUserLastConnectionService,
              public getTheHeavensService: GetTheHeavensService,
              public socketNotificationService: SocketNotificationsService,
              public reportUserNotMatchedService: ReportUserNotMatchedService,
              public getPreferenceTagsService: GetPreferenceTagsService,
              public ipLocationService: IpLocationService,
              private lastConnection: LastConnectedTimeFormatPipe) {
}
  @ViewChild(HomeComponent, {static: false}) homeComponent: HomeComponent;
  @ViewChild(ChatComponent, {static: false}) chatComponent: ChatComponent;
  /**
   *  Resolve data for the view
   *
   */
  public resolveData: EnterViewHomeReturn;
  /**
   * Distance preference
   *
   */
  public distance: number;
  /**

  * UserPhotos tab
   *
   */
  public userPhotos: Photo[];
  /**
   * User profile picture
   *
   */
  public userPicture: string;
  /**
   * User first name
   *
   */
  public firstName: string;
  /**
   * User to swipe name
   *
   */
  public userToSwipeName: string;
  /**
   * User to swipe biographie
   *
   */
  public userToSwipeBio: string;
  /**
   * User to swipe photos
   *
   */
  public userToSwipePhotos: Photo[];
  /**
   * User to swipe id
   *
   */
  public userToSwipeId: number;
  /**
   * User to swipe age
   *
   */
  public userToSwipeAge: number;
  /**
   * The user to swipe distance from the log user
   */
  public userToSwipeDistance: any;
  /**
   * The user current postion
   */
  public userCurrentPosition: any;
  /**
   *
   * User to swipe tags
   */
  public userToSwipeTags: UserTag[] = [];
  /**
   *
   * Notification list
   */
  public notifications: Notification[];
  /**
   *
   * Get preference tags of user
   */
  public prefTags: PrefTag[] = [];
  public userToSwipePopularity: number;
  public userToSwipe: boolean;
  public nbMessages = 0;

  public peopleInHeavens = [];
  public progressBarValue = 0; // to put at 0
  public heavensClicked = 0;
  public interval: any;

  public profileComplete = 0;

  public APIParameterGetUserOnline: GetUserOnlineParameter;
  public APIParameterSaveUserLastConnection: SaveUserLastConnectionParameter;

  async getUserPosition() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        if (latitude && longitude) {
          this.userCurrentPosition = new google.maps.LatLng(latitude, longitude);
        }
      }, async error => {
        if (error) {
          await this.ipLocationService.ipLocation().subscribe((result: IpLocationReturn) => {
            if (result.latitude) {
              const latitude = result.latitude;
              const longitude = result.longitude;
              this.userCurrentPosition = new google.maps.LatLng(latitude, longitude);
            }
          });
        }
      });
    }
  }

  initUserPic() {
    this.getUserPhotosService.getUserPhotos(this.resolveData.id)
      .subscribe((result: GetUserPhotosReturn) => {
        if (result.success) {
          this.userPhotos = result.photos;
          if (this.userPhotos.length > 0) {
            localStorage.setItem('user-img', this.userPhotos[0].photo);
            this.userPicture = this.userPhotos[0].photo;
            this.profileComplete = 1;
          } else {
            this.profileComplete = 0;
          }
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

  getUserPhotos(userId: number) {
    this.getUserPhotosService.getUserPhotos(userId)
    .subscribe((result: GetUserPhotosReturn) => {
      if (result.success) {
        this.fillUserToSwipePhotos(result.photos);
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

  fillUserToSwipePhotos(photo) {
    this.userToSwipePhotos = photo;
  }

  getUserToSwipeTags(id: number) {
    this.getUserTagsService.getUserTags(id)
      .subscribe((result: GetUserTagsReturn) => {
        if (result.success) {
          this.userToSwipeTags = result.userTags;
        }
      });
  }

  async getUserToSwipe() {
    this.userToSwipe = false;
    const APIParameter: GetUserToSwipeParameter = {
      id: this.resolveData.id,
      interest: this.resolveData.interest,
      gender: this.resolveData.gender,
      minage: this.resolveData.minage,
      maxage: this.resolveData.maxage,
      distance: this.resolveData.distance,
      popularity: this.resolveData.pop,
      prefTags: this.resolveData.prefTags,
    };
    await this.getUserToSwipeService.getUserToSwipe(APIParameter)
    .subscribe(async (result: GetUserToSwipeReturn) => {
      if (result.success) {
        this.userToSwipe = true;
        this.getUserPhotos(result.id);
        this.userToSwipeName = result.firstname;
        this.userToSwipeBio = result.bio;
        this.userToSwipeId = result.id;
        console.log(result.popularity);
        this.userToSwipePopularity = result.popularity;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        this.userToSwipeAge = currentYear - +result.year;
        if (this.userCurrentPosition) {
          const userToSwipePos = new google.maps.LatLng(result.position.latitude, result.position.longitude);
          this.userToSwipeDistance = Math.floor(Math.round(await +google.maps.geometry.spherical.computeDistanceBetween(
            this.userCurrentPosition,
            userToSwipePos
          )) / 1000);
        }
        this.getUserToSwipeTags(result.id);
      }
      if (this.userToSwipeDistance >= this.resolveData.distance || !this.userCurrentPosition
          || (this.userToSwipeAge < this.resolveData.minage && this.userToSwipeAge > this.resolveData.maxage)
          || (this.userToSwipePopularity > this.resolveData.pop)) {
        this.userToSwipe = false;
        setTimeout(async () => {
          try {
            if (!this.userCurrentPosition) {
              await this.getUserPosition();
            }
          } catch (err) {
            throw err;
          } finally {
            await this.getUserToSwipe();
          }
        }, 250);
      }
      // Notify userToSwipe
      this.socketNotificationService.notify(+localStorage.getItem('userId'), this.resolveData.firstname, result.id, 1);
    });
  }

  swipe(like: boolean) {
    const APIParameter: SwipeParameter = {
      id_user: this.resolveData.id,
      id_user_: this.userToSwipeId,
      like,
    };
    this.swipeService.swipe(APIParameter)
      .subscribe((result: SwipeReturn) => {
        if (result.success) {
          // if you like the person, we send a notification to this one
          if (like && !result.match) {
            this.socketNotificationService.notify(+localStorage.getItem('userId'), this.resolveData.firstname, this.userToSwipeId, 4);
          } else {
            this.socketNotificationService.notify(+localStorage.getItem('userId'), this.resolveData.firstname, this.userToSwipeId, 5);
          }
          this.getUserToSwipe();
          if (result.match) {
            this.chatComponent.loadMatches();
            $('.match').show();
            setTimeout(() => {
                $('.match').hide();
            }, 3000);
          }
        }
      });
    if (like === true) {
      this.progressToTheHeavens();
    }
  }

async getTheHeavens() {
    const APIParameter: GetTheHeavensParameter = {
      id: this.resolveData.id,
      interest: this.resolveData.interest,
      gender: this.resolveData.gender,
      minage: this.resolveData.minage,
      maxage: this.resolveData.maxage,
      distance: this.resolveData.distance
    };
    await this.getTheHeavensService.getTheHeavens(APIParameter)
    .subscribe((result: GetTheHeavensReturn) => {
      if (result.success) {
        let index = 0;
        this.interval = setInterval(() => {
          if (index === result.people_list.length) {
            this.hideThem();
            return;
          }
          this.peopleInHeavens.push(result.people_list[index]);
          this.displayTheHeavens();
          index++;
        }, 500);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Network',
          detail: result.message,
          life: 6000
        });
      }
    });
  }

  hideThem() {
    clearInterval(this.interval);
    setTimeout(() => {
      anime({
        targets: '.card',
        opacity: 0,
        duration: 3000
      });
    }, 3000);
    setTimeout(() => {
      this.heavensClicked = 0;
      this.progressBarValue = 0;
      this.peopleInHeavens = [];
      this.showCard();
      anime({
        targets: '.swipe-zone',
        opacity: 1,
        duration: 2000
      });
    }, 4000);
  }

  showCard() {
    anime({
      targets: '.card',
      opacity: 1,
      duration: 3000
    });
  }

  displayTheHeavens() {
    anime({
      targets: '.card',
      opacity: 1,
      duration: 5000
    });
  }

  progressToTheHeavens() {
    this.progressBarValue = this.progressBarValue + 44; // 12 is good
  }

  showMeTheHeavens() {
    setTimeout(() => {
      this.getTheHeavens();
      this.heavensClicked = 1;
      anime({
        targets: '.heaven',
        opacity: 1,
        duration: 5000
      });
    }, 1000);
    anime({
      targets: '.swipe-zone, .showMTH',
      opacity: 0,
      duration: 5000
    });
  }

  showChat($event: any) {
    const slider = document.querySelector('.slider1');

    if (slider.classList.contains('opened')) {
      slider.classList.remove('opened');
      slider.classList.add('closed');
      this.chatComponent.loadMatches();
    } else {
        slider.classList.remove('closed');
        slider.classList.add('opened');
    }
  }

  showNotifs() {
    const slider = document.querySelector('.slider3');
    if (slider.classList.contains('opened')) {
      slider.classList.remove('opened');
      slider.classList.add('closed');
    } else {
        slider.classList.remove('closed');
        slider.classList.add('opened');
    }
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

  reportUser() {
    const APIParameter: ReportUserNotMatchedParameter = {
      id_user: +localStorage.getItem('userId'),
      id_user_: this.userToSwipeId
    };
    this.reportUserNotMatchedService.reportUserNotMatched(APIParameter)
      .subscribe((result: ReportUserNotMatchedReturn) => {
        if (result.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Report',
            detail: 'User successfully reported',
            life: 6000
          });
          this.getUserToSwipe();
        }
      });
  }

  async ngOnInit() {
    this.socketNotificationService.connect();
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    this.initUserPic();
    this.firstName = this.resolveData.firstname;
    this.distance = this.resolveData.distance;
    this.getUserOnline(1);
    // when the user leaves
    window.addEventListener('unload', (event) => {
      const date = new Date();
      this.getUserOnline(0);
      this.saveUserLastConnection(date);
    });
    this.notifications = this.socketNotificationService.notifications;
    try {
      await this.getUserPosition();
    } catch (err) {
      throw err;
    } finally {
      await this.getUserToSwipe();
    }
    // this.nbMessages = this.socketNotificationService.nbMessages;
  }
}
