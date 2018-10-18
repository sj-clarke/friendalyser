import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { getAuthServiceConfigs } from "../../socialloginConfig";
import { NgSemanticModule } from 'ng-semantic';

import { AppComponent } from './app.component';
import {SemanticButtonComponent} from 'ng-semantic/src/button/button';
import { NavbarComponent } from './navbar/navbar.component';
import {UserAuthService} from './shared/user-auth-service';
import {ApiService} from './shared/api-service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocialLoginModule,
    NgSemanticModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    UserAuthService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
