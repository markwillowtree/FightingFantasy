import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, from, Observable } from 'rxjs';
import { concatAll, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { PlayThroughModel, PlayThroughParagraphModel } from 'src/app/services/apiClient';
import { playthroughAddParagraphBegin, playthroughGetBegin, playthroughGetSuccess } from 'src/app/state/playthough.actions';
import { paragraphSelected } from 'src/app/state/paragraph.actions';
import { 
  groupedStatsSelector, 
  playthroughSelector,
  selectedParagraphSelector,
  cyElementsSelector, 
  lastParagraphSelector
} from 'src/app/state/playthrough.selectors';
import * as cytoscape from 'cytoscape';
import { AppState } from 'src/app/state/app.state';
import * as lodash from 'lodash';

@Component({
  selector: 'app-playthrough',
  templateUrl: './playthrough.component.html',
  styleUrls: ['./playthrough.component.css']
})
export class PlaythroughComponent implements OnInit {

  playthrough$  :Observable<PlayThroughModel>= this.store.pipe(select(playthroughSelector));
  selectedParagraph$  :Observable<PlayThroughParagraphModel> = this.store.pipe(select(selectedParagraphSelector));
  lastParagraph$ : Observable<PlayThroughParagraphModel> = this.store.pipe(select(lastParagraphSelector));
  groupedStats$ : Observable<any[]> = this.store.pipe(select(groupedStatsSelector));
  cyElements$: Observable<any[]> = this.store.pipe(select(cyElementsSelector));

  @ViewChild('mapCanvas', {static: true}) mapCanvas;
  cy;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private apiService: ApiService) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(playthroughGetBegin({playthroughId : Number(params.playthroughId)}))
    })    

    this.cyElements$.subscribe(cyElements => {
      this.cy = cytoscape({
            container: this.mapCanvas.nativeElement,
            style: [ // the stylesheet for the graph
              {
                selector: 'node',
                style: {
                   'height': 'label',
                   'width': 'label',
                   'text-max-width': '200px',
                   'background-color': '#FFFFF0',
                   "label": "data(label)",
                    'text-wrap': 'wrap',
                    'text-halign': 'center',
                    'text-valign': 'center',
                    'shape': 'round-rectangle',
                    'font-family': 'cursive'
                }
              },
              {
                'selector': 'node[label]',
                'style': {
                  'label': 'data(label)',
                  'text-valign': 'center',
                  'text-halign': 'center',
                  'padding-top' : '2px',
                  'padding-bottom' : '2px',
                  'padding-left' : '2px',
                  'padding-right' : '2px',
                }
              }]
          });

      this.cy.add(cyElements);
    });
  }

  addParagraph() {

    let currParagraph: PlayThroughParagraphModel;
    let currPlaythrough: PlayThroughModel;

    combineLatest (this.playthrough$, this.lastParagraph$).subscribe(([playthrough, paragraph]) => {
        console.log(playthrough);
        console.log(paragraph);

        currParagraph = paragraph;
        currPlaythrough = playthrough;
      });

      let newParagraph = lodash.cloneDeep(currParagraph);
        newParagraph.id = undefined;
        newParagraph.yPos += 50;
        newParagraph.description = "Enter a description";

        this.store.dispatch(playthroughAddParagraphBegin({playthroughId: currPlaythrough.id, paragraph: newParagraph}))
  }
}
