import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AddMemberComponent } from './routes/add-member/add-member.component';
import { LogInComponent } from './routes/log-in/log-in.component';
import { ProfileComponent } from './routes/profile/profile.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddMemberComponent },
  { path: 'login', component: LogInComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
