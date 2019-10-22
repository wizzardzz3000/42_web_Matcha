import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoadMatchesParameter } from './services/load-matches/load-matches-parameter';
import { LoadMatchesReturn } from './services/load-matches/load-matches-return';
import { LoadMatchesService } from './services/load-matches/load-matches.service';
import { GetUserPhotosReturn, Photo } from '../home/services/get-user-photos/get-user-photos-return';
import { GetUserPhotosService } from '../home/services/get-user-photos/get-user-photos.service';
import * as io from 'socket.io-client';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SaveMessageService } from './services/save-message/save-message.service';
import { SaveMessageParameter } from './services/save-message/save-message-parameter';
import { SaveMessageReturn } from './services/save-message/save-message-return';
import { LoadConversationService } from './services/load-conversation/load-conversation.service';
import { LoadConversationParameter } from './services/load-conversation/load-conversation-parameter';
import { LoadConversationReturn } from './services/load-conversation/load-conversation-return';
import { EnterViewHomeService } from '../home/services/enter-view-home/enter-view-home.service';
import { EnterViewHomeParameter } from '../home/services/enter-view-home/enter-view-home-parameter';
import { EnterViewHomeReturn } from '../home/services/enter-view-home/enter-view-home-return';
import { JoinRoomService } from './services/join-room/join-room.service';
import { JoinRoomParameter } from './services/join-room/join-room-parameter';
import { JoinRoomReturn } from './services/join-room/join-room-return';
import { EnterViewSettingsService } from '../settings/services/enter-view-settings.service';
import { EnterViewSettingsParameter } from '../settings/services/enter-view-settings-parameter';
import { EnterViewSettingsReturn } from '../settings/services/enter-view-settings-return';
import { LastConnectedTimeFormatPipe } from '../pipes/last-connection.pipe';
import { RemoveMatchService } from './services/remove-match/remove-match.service';
import { RemoveMatchReturn } from './services/remove-match/remove-match.return';
import { ReportUserParameter } from './services/report-user/report-user.parameter';
import { ReportUserService } from './services/report-user/report-user.service';
import { ReportUserReturn } from './services/report-user/report-user.return';
import { SocketNotificationsService } from '../notifications/services/socket-notifications/socket-notifications.service';
import * as moment from 'moment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ LastConnectedTimeFormatPipe ]
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollMe', {static: false}) scrollMe: ElementRef;
  @Input() resolveData: EnterViewHomeReturn = null;

  constructor(public loadMatchesService: LoadMatchesService,
              public getUserPhotosService: GetUserPhotosService,
              public saveMessageService: SaveMessageService,
              public getMessagesArrayService: LoadConversationService,
              public getUserMatchedInfos: EnterViewHomeService,
              public joinRoomService: JoinRoomService,
              public getUserInfosService: EnterViewSettingsService,
              public fb: FormBuilder,
              public removeMatchService: RemoveMatchService,
              public reportUserService: ReportUserService,
              public socketNotificationService: SocketNotificationsService,
              public lastConnection: LastConnectedTimeFormatPipe) {
                this.messageForm = fb.group({
                  message: ['', Validators.required]
                });
              }

  public userPhotos: Photo[];
  public matchesObjects = [];
  public APIParameterLoadMatches: LoadMatchesParameter;
  public APIParameterSaveMessage: SaveMessageParameter;
  public APIParameterLoadConversation: LoadConversationParameter;
  public APIEnterViewHomeParameter: EnterViewHomeParameter;
  public APIJoinRoomParameter: JoinRoomParameter;
  public APIGetUserInfosParameter: EnterViewSettingsParameter;
  public matchId: number;
  public currentMatchId: number;
  public userMatchedId: number;
  public messageForm: FormGroup;
  public socket;
  public messageList = [];
  public id: number;
  public currentOpenedConversationMatchId: number;
  public userMatchedPicture: string;
  public userMatchedName: string;
  public aConversationWasOpened = 0;
  public profileWasOpened = 0;
  public previousId = 0;
  public userInfos = [];
  public userMatchedPhotos: Photo[];
  // public clickedData: string;

  scrollIt() {
    this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  }

  // LOAD MATCHES DATA
  // ----------------------------------------------------------------------------------------
  loadMatches() {
    this.APIParameterLoadMatches = {
      id: +localStorage.getItem('userId')
    };
    this.loadMatchesService.loadMatches(this.APIParameterLoadMatches)
      .subscribe((result: LoadMatchesReturn) => {
        if (result.success) {
          this.initMatchPic(result.matches_list);
        }
      });
  }

  initMatchPic(matchesList) {
    if (this.matchesObjects.length === 0) {
      for (const match of matchesList) {
        if (match) {
          this.getUserPhotosService.getUserPhotos(parseInt(match.id_user_matched, 10))
            .subscribe((result: GetUserPhotosReturn) => {
              if (result.success) {
                this.userPhotos = result.photos;
                if (this.userPhotos.length > 0) {
                  const obj = {};
                  const me = Object.create(obj);
                  me.id = match;
                  me.picture = this.userPhotos[0].photo;
                  this.matchesObjects.push(me);
                }
              }
            });
        } else {
          // this.matchesObjects[0] =
        }
      }
    }
  }

  // LOAD USER_MATCHED INFOS
  // ----------------------------------------------------------------------------------------
  loadMatchInfos(userMatchedId) {
    this.aConversationWasOpened = 1;
    this.profileWasOpened = 0;
    this.userMatchedId = userMatchedId;
    this.getUserPhotosService.getUserPhotos(userMatchedId)
      .subscribe((result: GetUserPhotosReturn) => {
        if (result.success) {
          this.userPhotos = result.photos;
          if (this.userPhotos.length > 0) {
            this.userMatchedPicture = this.userPhotos[0].photo;
          }
        }
      });

    this.APIEnterViewHomeParameter = {
      id: userMatchedId
    };
    this.getUserMatchedInfos.enterView(this.APIEnterViewHomeParameter)
      .subscribe((result: EnterViewHomeReturn) => {
        if (result.success) {
          this.userMatchedName = result.firstname;
        }
      });
  }

  async loadMatchProfileData() {
    if (this.profileWasOpened === 0) {
      this.profileWasOpened = 1;
    } else {
      this.profileWasOpened = 0;
      if (this.messageList.length > 1) {
        setTimeout(() => {
          this.scrollIt();
        }, 100);
      }
    }
    await this.getUserInfosService.enterView(this.userMatchedId)
      .subscribe((result: EnterViewSettingsReturn) => {
        if (result.success) {
          this.userInfos = result.user;
          this.userInfos[0].birthdate = this.getAge(this.userInfos[0].birthdate);
        }
      });
    await this.getUserPhotosService.getUserPhotos(this.userMatchedId)
      .subscribe((result: GetUserPhotosReturn) => {
        if (result.success) {
          this.userMatchedPhotos = result.photos;
        }
      });
  }

  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  // LOAD MESSAGES
  // ----------------------------------------------------------------------------------------
  loadMessages(matchId) {
    if (matchId) {
      this.joinRoom(matchId);
      this.currentMatchId = matchId;
      this.APIParameterLoadConversation = {
        id: matchId
      };
      this.currentOpenedConversationMatchId = matchId;
      this.getMessagesArrayService.loadConversation(this.APIParameterLoadConversation)
        .subscribe((result: LoadConversationReturn) => {
          if (result.success) {
            this.fillMessagesArray(result.messageArray);
          }
        });
    }
  }
  fillMessagesArray(messageArray) {
    if (this.messageList) {
      this.messageList = [];
    }
    for (const mess of messageArray) {
      if (mess) {
        const obj = {};
        const me = Object.create(obj);
        me.id = mess.id_user;
        me.msg = mess.message;
        me.ts = mess.ts.slice(0, 19).replace('T', ' ');
        this.messageList.push(me);
      }
    }
    if (this.messageList.length > 1) {
      setTimeout(() => {
        this.scrollIt();
      }, 100);
    }
  }

  // JOIN CHAT ROOM
  // ----------------------------------------------------------------------------------------
  joinRoom(matchId) {
    if (this.previousId > 0) {
      this.socket.emit('leave room', this.previousId.toString());
    }
    try {
      this.socket.emit('join room', matchId.toString());
      this.previousId = matchId;
    } catch (e) {
        // console.log('Could not connect socket.io');
    }
  }

  // SEND AND SAVE MESSAGES
  // ----------------------------------------------------------------------------------------
  sendMessage() {
    if (this.currentMatchId > 0) {
      if (this.messageForm.valid) { // add that match exists
        const msg = this.messageForm.get('message').value;
        if (msg && msg.length > 0) {
          const obj = {};
          const me = Object.create(obj);
          me.id = this.id;
          me.msg = msg;
          me.ts = new Date(); // dummy value replaced by NOW() in the backend
          this.socket.emit('send message', me);
          this.messageForm.reset();
          this.saveMessage(this.id, msg, 1);
          // Send a notification to the recipient
          this.matchesObjects.forEach((v) => {
            if (v.id.id_match === this.currentMatchId) {
              this.socketNotificationService.notify(this.id, this.resolveData.firstname, v.id.id_user_matched, 6);
            }
          });
        }
        if (this.messageList.length > 1) {
          setTimeout(() => {
            this.scrollIt();
          }, 100);
        }
      }
    }
  }
  saveMessage(idUser, message, ts) {
    this.APIParameterSaveMessage = {
      idMessage: 1,
      idUser,
      message,
      ts,
      idMatch: this.currentOpenedConversationMatchId
    };
    this.saveMessageService.saveMessage(this.APIParameterSaveMessage)
      .subscribe((result: SaveMessageReturn) => {
        if (result.success) {
          // console.log(result.message);
        }
      });
  }

  receive = (obj) => {
    if (obj) {
      this.messageList.push(obj);
    }

  }

  // ANIMATIONS
  // ----------------------------------------------------------------------------------------
  transition() {
    const div = document.getElementById('contentArea');
    div.style.opacity = '1';
    div.style.transition = 'opacity 2s';
  }

  hideIt() {
    const div = document.getElementById('contentArea');
    div.style.opacity = '0';
  }

  reportUser(idUserMatched) {
    this.matchesObjects.forEach((v) => {
      if (v.id.id_user_matched === idUserMatched) {
        const idMatch = v.id.id_match;
        const APIParameter: ReportUserParameter = {
          id_match: idMatch,
          id_user: this.id,
          id_user_: idUserMatched,
        };
        this.reportUserService.reportUser(APIParameter)
          .subscribe((result: ReportUserReturn) => {
            if (result.success) {
              this.socketNotificationService.notify(this.id, this.resolveData.firstname, v.id.id_user_matched, 3);
            }
        });
      }
    });
  }

  removeUser(idUserMatched: number) {
    this.matchesObjects.forEach((v) => {
      if (v.id.id_user_matched === idUserMatched) {
        this.removeMatchService.removeMatch(v.id.id_match)
          .subscribe((result: RemoveMatchReturn) => {
            if (result.success) {
              this.socketNotificationService.notify(this.id, this.resolveData.firstname, v.id.id_user_matched, 2);
            }
          });
      }
    });
  }

  // NgOnInit
  // ----------------------------------------------------------------------------------------
  ngOnInit() {
    this.id = parseInt(localStorage.getItem('userId'), 10);
    this.loadMatches();
    try {
      this.socket = io.connect('http://localhost:3000');
      this.socket.on('receive message', this.receive);
    } catch (e) {
      // console.log('Could not connect socket.io');
    }
  }

}
