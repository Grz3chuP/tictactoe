import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./login/login.component";
import {IndexComponent} from "./index/index.component";
import {WaitingroomComponent} from "./waitingroom/waitingroom.component";

const routes: Routes = [
  {
    path: 'index', component: IndexComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'waitingRoom', component: WaitingroomComponent },
  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
