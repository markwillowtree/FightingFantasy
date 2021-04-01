import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BookModel, PlayThroughModel } from '../services/apiClient';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  public book: BookModel;
  public playthroughs: PlayThroughModel[];
  private bookId: number;

  constructor(private apiService: ApiService, route: ActivatedRoute) {
    route.params.subscribe(params => { this.bookId = params['bookId']; });

    this.apiService.client.getBookById(this.bookId).then(
      (book) => { this.book = book; },
      (err) => { console.log(`getBookById failed: ${err.title}`); }
    );
  }

  ngOnInit(): void {
    console.log(`${this.bookId} selected`);
     
    

    this.apiService.client.getPlaythroughsByBookId(this.bookId).then(
      (playthroughs) => { this.playthroughs = playthroughs; },
      (err) => { console.log(`getPlaythroughsByBookId failed ${err.title}`); }
    );
  }

  onCreatePlaythrough(bookId) {
    console.log(`playthrough created on book ${bookId}`);
  }
}
