import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'book-detail/:bookId', component: BookDetailComponent, canActivate: [AutoLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
