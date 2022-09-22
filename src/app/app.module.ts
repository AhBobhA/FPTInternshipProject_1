import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './routes/home/home.component';
import { AddMemberComponent } from './routes/add-member/add-member.component';
import { EditWindowComponent } from './component/edit-window/edit-window.component';
import { LogInComponent } from './routes/log-in/log-in.component';

import { AuthInterceptor } from './interceptor/auth.interceptor';

import { StoreModule } from '@ngrx/store';
import { authStoreReducer } from './stores/authStore/authStore.reducer';

import { AuthService } from './services/auth.service';
import { GetUserService } from './services/get-user.service';
import { LSManagerService } from './services/ls-manager.service';
import { ChildToParentService } from './services/child-to-parent.service';
import { ErrorMsgComponent } from './component/error-msg/error-msg.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SafeGuardPipe } from './pipe/safe-guard.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddMemberComponent,
    EditWindowComponent,
    LogInComponent,
    ErrorMsgComponent,
    ProfileComponent,
    SafeGuardPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzGridModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot( {loginStatus: authStoreReducer})
  ],
  providers: [
    LSManagerService,   
    ChildToParentService,  
    AuthService,
    GetUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
