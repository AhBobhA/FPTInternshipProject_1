import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AddMemberComponent } from './routes/add-member/add-member.component';
import { LogInComponent } from './routes/log-in/log-in.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { RouteGuard } from './services/route.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RouteGuard] },
  { path: 'add', component: AddMemberComponent, canActivate: [RouteGuard] },
  { path: 'login', component: LogInComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
