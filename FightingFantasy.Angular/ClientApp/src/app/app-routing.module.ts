import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreatePlaythroughComponent } from './components/create-playthrough/create-playthrough.component';
import { InitialiseCharacterComponent } from './components/initialise-character/initialise-character.component';
import { PlaythroughComponent } from './components/playthrough/playthrough.component';
import { RegisterComponent } from './components/register/register.component';

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
