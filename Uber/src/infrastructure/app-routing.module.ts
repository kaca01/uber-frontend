import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { UUHomeComponent } from 'src/app/components/home/unregistered-user/uu-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'uu-home', component: UUHomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: UUHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
