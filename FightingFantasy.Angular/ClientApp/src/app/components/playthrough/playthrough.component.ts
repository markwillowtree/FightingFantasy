import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { concatAll, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { PlayThroughModel, PlayThroughParagraphModel } from 'src/app/services/apiClient';
import { retrievedPlaythrough } from 'src/app/state/playthough.actions';
import { paragraphSelected } from 'src/app/state/paragraph.actions';
import { groupedStatsSelector, playthroughSelector } from 'src/app/state/playthrough.selectors';
import { selectedParagraphSelector } from 'src/app/state/playthrough.selectors'

@Component({
  selector: 'app-playthrough',
  templateUrl: './playthrough.component.html',
  styleUrls: ['./playthrough.component.css']
})
export class PlaythroughComponent implements OnInit {

  playthrough$  :Observable<PlayThroughModel>= this.store.pipe(select(playthroughSelector));
  selectedParagraph$  :Observable<PlayThroughParagraphModel> = this.store.pipe(select(selectedParagraphSelector));
  groupedStats$ : Observable<any[]> = this.store.pipe(select(groupedStatsSelector));

  constructor(private store: Store, private route: ActivatedRoute, private apiService: ApiService) {

   }

  ngOnInit(): void {

    // get playthrough from backend based on routeid and initialise store
    this.route.params.pipe(
      map(params => from(this.apiService.client.getPlaythrough(params.playthroughId))),
      concatAll()
    ).subscribe(playthrough => {
      this.store.dispatch(retrievedPlaythrough(playthrough));
      this.store.dispatch(paragraphSelected(playthrough.startParagraph));     
    });


  }

}
