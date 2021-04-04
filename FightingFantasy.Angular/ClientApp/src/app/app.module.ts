import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaythroughComponent } from './components/playthrough/playthrough.component';
import { CreatePlaythroughComponent } from './components/create-playthrough/create-playthrough.component';
import { InitialiseCharacterComponent } from './components/initialise-character/initialise-character.component';
import { DiceComponent } from './components/dice/dice.component';
import { StoreModule } from '@ngrx/store';
import { playthroughReducer} from './state/playthrough.reducer';
import {paragraphReducer} from './state/paragraph.reducer';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent,
    RegisterComponent,
    ChangePasswordComponent,
    PlaythroughComponent,
    CreatePlaythroughComponent,
    InitialiseCharacterComponent,
    DiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({playthrough: playthroughReducer, selectedParagraph: paragraphReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
