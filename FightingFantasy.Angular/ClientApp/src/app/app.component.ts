import { Component, Inject } from '@angular/core';
import { BookModel, Client } from '../apiClient/apiClient';
import { Observable, from } from "rxjs"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fighting Fantasy';

  customFetch = function (url: RequestInfo, options?: RequestInit): Promise<Response> {
    options.mode = 'cors';
    options.headers['Access-Control-Allow-Origin'] = location.origin;

    return window.fetch(url, options);
  };

  client = new Client("https://localhost:44377", { fetch: this.customFetch });
  books: Observable<BookModel[]>;

  constructor() {

    this.books = from(this.client.getAllBooks());
  }
}
