import {Component, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {UserAuthService} from './shared/user-auth-service';
import {ApiService} from './shared/api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Emotion in image returned from API
  emotionResponse = [];
  primaryEmotion: {emotionName: string, score: number};
  resultString = '';
  emotionLoadingImg = '';
  imageUrl: string = '';

  private _loading: boolean;
  set loading(val: boolean) {
    this._loading = val;

  }
  get loading(): boolean {
    return this._loading;
  }

  ngOnInit() {
    this.loading = false;

    const imageArr = ['happiness', 'anger', 'surprise', 'disgust', 'happiness', 'neutral', 'fear'];
    let counter = 0;

    // Select next emotion image every .5 sec
    setInterval(() => {
      this.emotionLoadingImg = `../assets/images/emotions/${imageArr[counter]}.png`;
      // Go to next emotion string
      if (counter < 6) {
        counter++;
      } else { // reset to 0
        counter = 0;
      }
    }, 500);
  }

  constructor(
    public userAuthService: UserAuthService,
    private apiService: ApiService
  ) {}

  analyseImage() {
    this.loading = true;
    this.apiService.analyseImage(this.imageUrl)
      .subscribe(data => {
        this.emotionResponse = data;
        const emotionsObj = data[0].faceAttributes.emotion;
        const gender = data[0].faceAttributes.gender;
        // Build an array of returned emotions
        const emotionsArr = Object.entries(emotionsObj).map(([key, value]) => ({
          'emotionName': key,
          'score': +Number(value).toFixed(1)
        }));
        console.log(emotionsArr);
        let highestNumber = 0;
        // Loop through emotions Arr to find highest score
        emotionsArr.forEach((emotion) => {
          if (emotion.score > highestNumber) {
            highestNumber = emotion.score;
            this.primaryEmotion = emotion;
          }
        });
        // Create an object with emotion names and the strings I want them to return
        const emotionNamesObj = {
          'anger': 'angry',
          'contempt': 'contempt',
          'disgust': 'disgusted',
          'fear': 'fearful',
          'happiness': 'happy',
          'neutral': 'neutral',
          'sadness': 'sad',
          'surprise': 'surprised'
        };
        this.resultString = `${gender === 'male' ? 'He is ': 'She is '} ${this.primaryEmotion.score * 100}% ${emotionNamesObj[this.primaryEmotion.emotionName]}!`;
        this.loading = false;
      });
  }

}
