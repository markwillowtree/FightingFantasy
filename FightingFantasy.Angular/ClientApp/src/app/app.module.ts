import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaythroughComponent } from './playthrough/playthrough.component';
import { CreatePlaythroughComponent } from './create-playthrough/create-playthrough.component';
import { InitialiseCharacterComponent } from './initialise-character/initialise-character.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent,
    RegisterComponent,
    ChangePasswordComponent,
    PlaythroughComponent,
    CreatePlaythroughComponent,
    InitialiseCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
