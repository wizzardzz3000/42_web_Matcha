import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import {IsLoggedInGuard} from './guards/is-logged-in-guard';
import { SettingsComponent } from './settings/settings.component';
import {IsLoggedOutGuard} from './guards/is-logged-out-guard';
import { EnterViewSettingsResolve } from './settings/enter-view-settings.resolve';
import {EnterViewHomeResolve} from './home/enter-view-home.resolve';
import { EnterViewActivateResolve } from './landing-page/services/enter-view-activate/enter-view-activate.resolve';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PopulateComponent } from './populate/populate.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsLoggedInGuard],
    resolve: {viewData: EnterViewHomeResolve}
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'settings/:id',
    component: SettingsComponent,
    canActivate: [IsLoggedInGuard],
    resolve: {viewData: EnterViewSettingsResolve}
  },
  {
    path: 'activate/:email/:key',
    component: LandingPageComponent,
    canActivate: [IsLoggedOutGuard],
    resolve: {viewData: EnterViewActivateResolve}
  },
  {
    path: 'resetPassword/:email/:key',
    component: LandingPageComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'test',
    component: LandingPageComponent,
    canActivate: [IsLoggedOutGuard],
  },
  // {
  //   path: 'populate',
  //   component: PopulateComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    IsLoggedInGuard,
    IsLoggedOutGuard,
    EnterViewHomeResolve,
    HomeComponent,
    SettingsComponent,
    EnterViewSettingsResolve,
    EnterViewActivateResolve
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
