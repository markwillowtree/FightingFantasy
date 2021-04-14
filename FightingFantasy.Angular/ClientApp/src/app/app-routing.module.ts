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
  { 
    path: '', 
    loadChildren: () => import('./components/book-list/book-list.module').then(m => m.BookListModule)
  },
  { 
    path: 'register', 
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)
  },
  { 
    path: 'change-password', 
    loadChildren: () => import('./components/change-password/change-password.module').then(m => m.ChangePasswordModule),
    canActivate: [AutoLoginGuard] 
  },
  { 
    path: 'book-detail/:bookId', 
    canActivate: [AutoLoginGuard] , 
    loadChildren: () => import('./components/book-detail/book-detail.module').then(m => m.BookDetailModule)
  },
  { 
    path: 'playthrough/:playthroughId', 
    canActivate: [AutoLoginGuard],
    loadChildren: () => import('./components/playthrough/playthrough.module').then(m => m.PlaythroughModule)
  },
  { 
    path: 'create-playthrough/:bookId', 
    loadChildren: () => import('./components/create-playthrough/create-playthrough.module')
    .then(m => m.CreatePlaythroughModule),
    canActivate: [AutoLoginGuard] 
  },
  { 
    path: 'initialise-character/:playthroughId', 
    loadChildren: () => import('./components/initialise-character/initialise-character.module')
    .then(m => m.InitialiseCharacterModule),
    canActivate: [AutoLoginGuard] 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
