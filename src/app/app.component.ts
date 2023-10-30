import { Component } from '@angular/core';
import {checkUserIsLogin} from "../firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tictactoe';

  constructor() {
    checkUserIsLogin()
  }


}
