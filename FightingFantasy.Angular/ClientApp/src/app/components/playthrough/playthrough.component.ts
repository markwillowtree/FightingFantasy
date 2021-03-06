import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, from, Observable } from 'rxjs';
import { PlayThroughModel, PlayThroughParagraphModel, PlaythroughStatModel } from 'src/app/services/apiClient';
import { addParagraphBegin, deleteLastParagraphBegin, descriptionChangeBegin, playthroughGetBegin, paragraphNumberChangeBegin, selectParagraph, itemsChangeBegin, statChangeBegin, positionChangeBegin, mapZoomIn, mapZoomOut, mapZoomReset, mapPan } from 'src/app/state/playthough.actions';
import { 
  groupedStatsSelector, 
  playthroughSelector,
  cyElementsSelector, 
  lastParagraphSelector,
  selectedParagraphSelector,
  errorSelector,
  cyZoomSelector,
  cyPanSelector
} from 'src/app/state/playthrough.selectors';
import cytoscape from '../../../../node_modules/cytoscape/dist/cytoscape.esm.min.js';
import { AppState } from 'src/app/state/app.state';
import _ from 'lodash-es';

@Component({
  selector: 'app-playthrough',
  templateUrl: './playthrough.component.html',
  styleUrls: ['./playthrough.component.css']
})
export class PlaythroughComponent implements OnInit {

  playthrough$  :Observable<PlayThroughModel>= this.store.pipe(select(playthroughSelector));
  zoomLevel$ : Observable<number> = this.store.pipe(select(cyZoomSelector));
  pan$ : Observable<{x: number, y:number}> = this.store.pipe(select(cyPanSelector));
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

    combineLatest([this.zoomLevel$, this.cyElements$, this.pan$]).subscribe(result => {
      let zoomLevel = result[0];
      let cyElements = result[1];
      let pan = result[2];

      this.cy = cytoscape({
            container: this.mapCanvas.nativeElement,
            zoom: zoomLevel,
            pan: { x: pan.x, y: pan.y },
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

        if (paragraphId != undefined) {
          let currId;
          this.selectedParagraph$.subscribe(paragraph => {
            currId = paragraph.id;
          })  
          
          if (paragraphId != undefined && currId != paragraphId) {
            this.store.dispatch(selectParagraph({paragraphId: paragraphId}));
          }
        } 
        
      });

      this.cy.on('mouseup', (event) => {
        let paragraphId = event.target._private.data.id;

        if (paragraphId == undefined) {
          this.store.dispatch(mapPan({x: event.target._private.pan.x, y: event.target._private.pan.y}));
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

    // this.cy.on('viewport', (event) => {
    //   console.log(`panned to ${event.target._private.pan.x}, ${event.target._private.pan.y}`);
    // });

    });
  }

  addParagraph() {

    let currParagraph: PlayThroughParagraphModel;
    let currPlaythrough: PlayThroughModel;

    combineLatest ([this.playthrough$, this.lastParagraph$]).subscribe(([playthrough, paragraph]) => {

        currParagraph = paragraph;
        currPlaythrough = playthrough;
      });

      let newParagraph = _.cloneDeep(currParagraph);
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

  zoomIn() {
    this.store.dispatch(mapZoomIn());
  }
  zoomOut() {
    this.store.dispatch(mapZoomOut());
  }

  zoomReset() {
    this.store.dispatch(mapZoomReset());
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
