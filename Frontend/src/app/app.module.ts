import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {WithUsernamePipe} from "./with-username.pipe";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { ByUserPipe } from './by-user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WithUsernamePipe,
    CommentEditorComponent,
    ByUserPipe
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
