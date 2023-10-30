import { Component } from '@angular/core';
import {logOut, signInWithGoogle, userIsLogged} from "../../firebase";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  loginUser(form: any) {
    const email = form.target.email.value;
    const password = form.target.password.value;
    console.log('Email: ' + email);
    console.log('Password: ' + password);
  }

  protected readonly userIsLogged = userIsLogged;
  protected readonly signInWithGoogle = signInWithGoogle;
  protected readonly logOut = logOut;

}
