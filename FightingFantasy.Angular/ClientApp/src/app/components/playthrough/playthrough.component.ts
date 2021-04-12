import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, from, Observable } from 'rxjs';
import { PlayThroughModel, PlayThroughParagraphModel, PlaythroughStatModel } from 'src/app/services/apiClient';
import { addParagraphBegin, deleteLastParagraphBegin, descriptionChangeBegin, playthroughGetBegin, paragraphNumberChangeBegin, selectParagraph, itemsChangeBegin, statChangeBegin, positionChangeBegin } from 'src/app/state/playthough.actions';
import { 
  groupedStatsSelector, 
  playthroughSelector,
  cyElementsSelector, 
  lastParagraphSelector,
  selectedParagraphSelector,
  errorSelector
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
  groupedStats$ : Observable<PlaythroughStatModel[][]> = this.store.pipe(select(groupedStatsSelector));
  cyElements$: Observable<any[]> = this.store.pipe(select(cyElementsSelector));
  error$: Observable<string> = this.store.pipe(select(errorSelector));

  @ViewChild('mapCanvas', {static: true}) mapCanvas;
  cy;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
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
      
      // node selected event
      this.cy.on('click', (event) => {
        let paragraphId = event.target._private.data.id;
        let currId;
        this.selectedParagraph$.subscribe(paragraph => {
          currId = paragraph.id;
        })  
        
        if (currId != paragraphId) {
          this.store.dispatch(selectParagraph({paragraphId: paragraphId}));
        }
        
      });

      // node dragged event
      this.cy.on('dragfreeon', (event) => {
        let paragraphId = event.target._private.data.id;
        let playthrough = this.getPlaythrough();
        let paragraph = this.getParagraphById(playthrough, paragraphId);
        
        let node = this.cy.elements(`node#${paragraphId}`);
        let position = node.position();

        console.log(`node ${paragraphId} moved`);

        this.store.dispatch(positionChangeBegin({
          playthroughId: playthrough.id, 
          paragraph: paragraph,  
          xPos: position.x,
          yPos: position.y
        }));
    });

    });
  }

  addParagraph() {

    let currParagraph: PlayThroughParagraphModel;
    let currPlaythrough: PlayThroughModel;

    combineLatest ([this.playthrough$, this.lastParagraph$]).subscribe(([playthrough, paragraph]) => {

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
    let playthrough: PlayThroughModel = this.getPlaythrough();

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

  changeStat(event) {
    let statId = event.target.dataset['statid'];
    let playthroughAndSelectedParagraph = this.getPlaythroughAndSelectedParagraph();

    this.store.dispatch(statChangeBegin(
      {
        playthroughId: playthroughAndSelectedParagraph.playthrough.id,
        statId: statId,
        newValue: event.target.value 
      }));
  }

  getPlaythrough() {
    let playthrough: PlayThroughModel;

    this.playthrough$.subscribe(p => {
      playthrough= p;
    })

    return playthrough;
  }

  getParagraphById(playthrough: PlayThroughModel, paragraphId: number) {
    let paragraph = playthrough.startParagraph;

    while(paragraph != undefined) {
      if (paragraph.id == paragraphId) {
        return paragraph;
      }
      paragraph = paragraph.toParagraph;
    }

    throw 'Invalid paragraph id: ' + paragraphId;
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

  trackByFn(index, item) {
    return index;  }
}
