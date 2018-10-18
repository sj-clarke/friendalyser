import {Injectable} from '@angular/core';
import {UserAuthService} from './user-auth-service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
  apiKey = '5b6135a796d54371afde2cb616318c16';

  constructor(
    public userAuthService: UserAuthService,
    private httpClient: HttpClient,
  ) {}

  analyseImage(image: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.apiKey
      }),
      params: new HttpParams()
        .set('returnFaceAttributes', 'emotion,gender')
    };

    const imageObj = {
      "url": image
    };

    return this.httpClient.post('https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect', imageObj, httpOptions)
      .map(
        // Get response and insert into array of seasons
        (response: any) => {
          return response;
        },
      )
      .catch((err: any) => {
        return Observable.throw(err);
      });
  }

}
