import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-playthrough',
  templateUrl: './create-playthrough.component.html',
  styleUrls: ['./create-playthrough.component.css']
})
export class CreatePlaythroughComponent implements OnInit {
  bookId: number;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    route.params.subscribe(params => { this.bookId = params['bookId']; });
  }

  ngOnInit(): void {
    this.apiService.client.createPlaythrough(this.bookId).then(
      (playthroughId) => {
        this.router.navigate(['initialise-character', playthroughId]);
      },
      (err) => {
        console.log(err.title);
      }
    );
  }

}
