import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Client } from './apiClient';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public client: Client;

  constructor(private oidcSecurityService: OidcSecurityService) {

    var customFetch = function (url: RequestInfo, options?: RequestInit): Promise<Response> {
      options.mode = 'cors';
      options.headers['Access-Control-Allow-Origin'] = location.origin;

      const token = oidcSecurityService.getToken();
      options.headers['Authorization'] = `Bearer ${token}`;
      return window.fetch(url, options);
    };


    this.client = new Client("https://localhost:44377", { fetch: customFetch });
  }
}