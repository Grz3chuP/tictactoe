import { Component } from '@angular/core';
import {logOut, signInWithEmailAndPassword1, signInWithGoogle, userIsLogged} from "../../firebase";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {





  loginUser(form: any) {
    const email = form.target.email.value;
    const password = form.target.password.value;
    console.log('Email: ' + email);
    console.log('Password: ' + password);
    signInWithEmailAndPassword1(email, password);
  }

  protected readonly signInWithGoogle = signInWithGoogle;
  protected readonly logOut = logOut;
  protected readonly userIsLogged = userIsLogged;
}
