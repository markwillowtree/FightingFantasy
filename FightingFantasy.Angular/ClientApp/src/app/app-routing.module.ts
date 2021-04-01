import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreatePlaythroughComponent } from './create-playthrough/create-playthrough.component';
import { InitialiseCharacterComponent } from './initialise-character/initialise-character.component';
import { PlaythroughComponent } from './playthrough/playthrough.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AutoLoginGuard]  },
  { path: 'book-detail/:bookId', component: BookDetailComponent, canActivate: [AutoLoginGuard] },
  { path: 'playthrough/:playthroughId', component: PlaythroughComponent, canActivate: [AutoLoginGuard] },
  { path: 'create-playthrough/:bookId', component: CreatePlaythroughComponent, canActivate: [AutoLoginGuard] },
  { path: 'initialise-character/:playthroughId', component: InitialiseCharacterComponent, canActivate: [AutoLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
