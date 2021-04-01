import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaythroughStatModel } from '../services/apiClient';
import { ApiService } from '../services/api.service';
import { PlayThroughModel } from '../services/apiClient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { concatAll, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-initialise-character',
  templateUrl: './initialise-character.component.html',
  styleUrls: ['./initialise-character.component.css']
})
export class InitialiseCharacterComponent implements OnInit {
  playthrough: PlayThroughModel;
  stats: PlaythroughStatModel[];

  statsForm: FormGroup;

  constructor(route: ActivatedRoute, private apiService: ApiService) {
    //var routeParamsObserver = {
    //  next: params => {
    //    this.playthroughId = params.playthroughId;
    //  },
    //  error: err => {
    //    console.log(err);
    //  },
    //  complete: () => {
    //    this.playthrough$ = from(this.apiService.client.getPlaythrough(this.playthroughId));
    //  }
    //};
    this.statsForm = new FormGroup({

    });

    route.params.pipe(
      map(params => from(this.apiService.client.getPlaythrough(params.playthroughId))),
      concatAll()
    ).subscribe(playthrough => {
      this.playthrough = playthrough;
      let stats = playthrough.startParagraph.stats;
        for (var i = 0; i < stats.length; i++) {
          this.statsForm.addControl(stats[i].name, new FormControl(0, Validators.required));
        }
      });
  }

  ngOnInit(): void {
    //this.statsForm = new FormGroup({

    //});

      //for (var i = 0; i < this.playthrough.startParagraph.stats.length; i++) {
      //  this.statsForm.addControl(this.stats[i].name, new FormControl(0, Validators.required));
      //}
    
  }

  onSubmit() {
    var skills = Object.keys(this.statsForm.controls);

    console.log(this.statsForm);
  }
}
