import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {AccordionModule, MenuModule, MessageService} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterService} from './landing-page/services/register/register.service';
import {LoginService} from './landing-page/services/login/login.service';
import {SliderModule} from 'primeng/slider';
import { SettingsComponent } from './settings/settings.component';
import { UpdatePasswordService } from './settings/services/update-password/update-password.service';
import { UpdateEmailService } from './settings/services/update-email/update-email.service';
import { UpdateNameService } from './settings/services/update-name/update-name.service';
import { EnterViewSettingsService } from './settings/services/enter-view-settings.service';
import { EnterViewSettingsResolve } from './settings/enter-view-settings.resolve';
import {UploadPhotoService} from './home/services/upload-photo/upload-photo.service';
import {GetUserPhotosService} from './home/services/get-user-photos/get-user-photos.service';
import { PreferencesComponent } from './preferences/preferences.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {EnterViewHomeResolve} from './home/enter-view-home.resolve';
import {EnterViewHomeService} from './home/services/enter-view-home/enter-view-home.service';
import { ActivateService } from './landing-page/services/activate/activate.service';
import { EnterViewActivateService } from './landing-page/services/enter-view-activate/enter-view-activate.service';
import { EnterViewActivateResolve } from './landing-page/services/enter-view-activate/enter-view-activate.resolve';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GetUserToSwipeService } from './home/services/get-user-to-swipe/get-user-to-swipe.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { GetNotificationsService } from './notifications/services/get-notifications/get-notifications.service';
import { PopulateComponent } from './populate/populate.component';
import { PopulateService } from './populate/services/populate.service';
import { LastConnectedTimeFormatPipe } from './pipes/last-connection.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    SettingsComponent,
    PreferencesComponent,
    ChatComponent,
    NotificationsComponent,
    PopulateComponent,
    LastConnectedTimeFormatPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    ToastModule,
    SliderModule,
    MenuModule,
    MultiSelectModule,
    DragDropModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    MessageService,
    RegisterService,
    LoginService,
    UpdatePasswordService,
    UpdateEmailService,
    UpdateNameService,
    EnterViewSettingsService,
    EnterViewSettingsResolve,
    UploadPhotoService,
    GetUserPhotosService,
    ActivateService,
    EnterViewActivateService,
    EnterViewActivateResolve,
    EnterViewHomeResolve,
    EnterViewHomeService,
    GetUserToSwipeService,
    GetNotificationsService,
    PopulateService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
