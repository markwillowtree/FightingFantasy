import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BookModel } from '../services/apiClient';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private bookId;
  public books: BookModel[];
  //private apiService: ApiService;

  constructor(private apiService :ApiService) {
   }

  ngOnInit(): void {
    this.apiService.client.getAllBooks().then(books => { this.books = books }); 
  }

}
