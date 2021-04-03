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
  numDice: Number = 0;

  statsForm: FormGroup;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.statsForm = new FormGroup({

    });

    this.route.params.pipe(
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

  onFocus(src) {
    this.numDice = src.dataset['dice'];
  }

  onDiceRoll(value: number) {
    console.log('dice rolled ' + value); 
  }
  // onSubmit() {
  //   var skills = Object.keys(this.statsForm.controls);

  //   console.log(this.statsForm);
  // }
}
