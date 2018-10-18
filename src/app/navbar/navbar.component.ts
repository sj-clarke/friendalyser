import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../shared/user-auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public userAuthService: UserAuthService
  ) {}

  ngOnInit() {
  }

}
