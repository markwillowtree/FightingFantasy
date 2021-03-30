import { Injectable } from '@angular/core';
import { Client } from './apiClient';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public client: Client;

  constructor() {

    var customFetch = function (url: RequestInfo, options?: RequestInit): Promise<Response> {
      options.mode = 'cors';
      options.headers['Access-Control-Allow-Origin'] = location.origin;

      return window.fetch(url, options);
    };


    this.client = new Client("https://localhost:44377", { fetch: customFetch });
  }
}
