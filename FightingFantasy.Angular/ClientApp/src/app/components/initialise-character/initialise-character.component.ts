import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaythroughStatModel } from '../../services/apiClient';
import { ApiService } from '../../services/api.service';
import { PlayThroughModel } from '../../services/apiClient';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { concatAll, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-initialise-character',
  templateUrl: './initialise-character.component.html',
  styleUrls: ['./initialise-character.component.css']
})
export class InitialiseCharacterComponent implements OnInit  {
  playthrough: PlayThroughModel;
  stats: PlaythroughStatModel[];
  numDice: number = 0;

  @ViewChildren('formInput') formInputs: QueryList<ElementRef>;
  statsForm: FormGroup;
  focusedInputElement: HTMLInputElement;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
  
    this.route.params.pipe(
      map(params => from(this.apiService.client.getPlaythrough(params.playthroughId))),
      concatAll()
    ).subscribe(playthrough => {
      // initialise model
      this.playthrough = playthrough;
      this.stats = playthrough.startParagraph.stats;

      // create form
      this.statsForm = new FormGroup({});
        for (var i = 0; i < this.stats.length; i++) {
          if (this.stats[i].initNumDice > 0) {
            this.statsForm.addControl(this.stats[i].name, new FormControl(0, [Validators.required, Validators.min(1)]));
          }
          else {
            this.statsForm.addControl(this.stats[i].name, new FormControl(0, [Validators.required]));
          }
        }
      });
  }

  onFocus(src: EventTarget) {
    var element = src as HTMLInputElement;
    this.numDice = Number(element.dataset['dice']);
    this.focusedInputElement = element;

  }

  onDiceRoll(value: number) {
    console.log('dice rolled ' + value); 

    if (this.focusedInputElement != undefined) {
      setTimeout(() => {
        this.statsForm.controls[this.focusedInputElement.name].setValue(value);
      }, 500);
    }
  }

  onSubmit() {
    let success: boolean = true;

    let  formControls = this.statsForm.controls;
    for(let i = 0; i < this.stats.length; i++) {
      let stat = this.stats[i];
      let ctrl = formControls[stat.name];
      stat.value = ctrl.value;
      this.apiService.client.updateStat(stat).then(
        success => { console.log(`${stat.name} updated successfully`);},
        err => {
          console.log(`Error updating ${stat.name}: ${err.title}`);
          success = false;
        }
      );
    }

    if (success) {
      this.router.navigate(['playthrough', this.playthrough.id]);
    }
  }
}
