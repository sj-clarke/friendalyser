import {AuthService, FacebookLoginProvider} from 'angularx-social-login';
import {Injectable} from '@angular/core';

@Injectable()
export class UserAuthService {
  user: any;

  constructor(
    private fbAuthService: AuthService
  ) {}

  public facebookLogin() {
    if (!this.user) {
      let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      this.fbAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          //this will return user data from facebook. What you need is a user token which you will send it to the server
          this.user = userData;
          console.log(this.user);
        }
      );
    }
  }
}
