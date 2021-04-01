import { Component, Inject, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { BookModel, Client } from '../apiClient/apiClient';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fighting Fantasy';

  isAuthenticated$: Observable<boolean>;

  constructor(public oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.isAuthenticated$ = this.oidcSecurityService.checkAuth();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}