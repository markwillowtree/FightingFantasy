import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, from, Observable } from 'rxjs';
import { concatAll, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { PlayThroughModel, PlayThroughParagraphModel } from 'src/app/services/apiClient';
import { addParagraphBegin, deleteLastParagraphBegin, descriptionChangeBegin, playthroughGetBegin, paragraphNumberChangeBegin, selectParagraph, itemsChangeBegin } from 'src/app/state/playthough.actions';
import { 
  groupedStatsSelector, 
  playthroughSelector,
  cyElementsSelector, 
  lastParagraphSelector,
  selectedParagraphSelector
} from 'src/app/state/playthrough.selectors';
import * as cytoscape from 'cytoscape';
import { AppState } from 'src/app/state/app.state';
import * as lodash from 'lodash';
import { concatLatestFrom } from '@ngrx/effects';

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
      
      this.cy.on('select grabon', (event) => {
        let paragraphId = event.target._private.data.id;

        this.store.dispatch(selectParagraph({paragraphId: paragraphId}));

        //console.log('node selected: ' + e);
      });
    });
  }

  addParagraph() {

    let currParagraph: PlayThroughParagraphModel;
    let currPlaythrough: PlayThroughModel;

    combineLatest ([this.playthrough$, this.lastParagraph$]).subscribe(([playthrough, paragraph]) => {
        console.log(playthrough);
        console.log(paragraph);

        currParagraph = paragraph;
        currPlaythrough = playthrough;
      });

      let newParagraph = lodash.cloneDeep(currParagraph);
        newParagraph.id = undefined;
        newParagraph.yPos += 50;
        newParagraph.description = "Enter a description";

        this.store.dispatch(addParagraphBegin({playthroughId: currPlaythrough.id, paragraph: newParagraph}))
  }

  deleteLastParagraph() {
    let playthrough: PlayThroughModel;

    this.playthrough$.subscribe((p) => {
      playthrough = p;
    });

    this.store.dispatch(deleteLastParagraphBegin({playthroughId: playthrough.id}));
  }

  onParagraphNumberChanged(event) {
    let playthrough: PlayThroughModel;
    let paragraph: PlayThroughParagraphModel;

    combineLatest([this.playthrough$, this.selectedParagraph$])
    .subscribe((result) => {
      playthrough = result[0];
      paragraph = result[1];
    });

    this.store.dispatch(paragraphNumberChangeBegin(
      {
        newParagraphNumber: Number(event.target.value),
        paragraphId : paragraph.id,
        playthroughId : playthrough.id
      }));
  }

  changeParagraphDescripton(event) {
    let playthroughAndParagraph = this.getPlaythroughAndSelectedParagraph();

    this.store.dispatch(descriptionChangeBegin(
      {
        newDescription: event.target.value,
        paragraphId: playthroughAndParagraph.paragraph.id,
        playthroughId: playthroughAndParagraph.playthrough.id
      }));
  }

  changeItems(event) {
    let playthroughAndParagraph = this.getPlaythroughAndSelectedParagraph();

    this.store.dispatch(itemsChangeBegin(
      {
        newItems: event.target.value,
        paragraphId: playthroughAndParagraph.paragraph.id,
        playthroughId: playthroughAndParagraph.playthrough.id
      }));
  }

  getPlaythroughAndSelectedParagraph() {
    let playthroughAndParagraph = {
      playthrough: undefined,
      paragraph: undefined
    };

    combineLatest([this.playthrough$, this.selectedParagraph$])
    .subscribe((result) => {
      playthroughAndParagraph.playthrough = result[0];
      playthroughAndParagraph.paragraph = result[1];
    });

    return playthroughAndParagraph;
  }
}
