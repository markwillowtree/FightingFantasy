import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, State, Store } from '@ngrx/store';
import _ from 'lodash-es';
import { EMPTY, from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';
import { AppState } from './app.state';
import { 
        addParagraphBegin, addParagraphError, addParagraphSuccess, 
        deleteLastParagraphBegin, deleteLastParagraphError, deleteLastParagraphSuccess, 
        descriptionChangeBegin, 
        playthroughGetBegin, playthroughGetError, playthroughGetSuccess, 
        paragraphNumberChangeBegin, 
        itemsChangeBegin, 
        statChangeBegin, 
        updateParagraphBegin, updateParagraphSuccess, updateParagraphError, positionChangeBegin, selectParagraph 
    } from './playthough.actions';
import { playthroughSelector, selectedParagraphSelector } from './playthrough.selectors';

@Injectable()
export class PlaythroughEffects {
    constructor(private apiService: ApiService, private action$: Actions, private state: Store<AppState>) {        
    }

    // get playthrough
    loadPlaythrough$ = createEffect(() => 
        this.action$.pipe(
            ofType(playthroughGetBegin),
            switchMap(action => 
                from(this.apiService.client.getPlaythrough(action.playthroughId)).pipe(
                    map((playthrough: PlayThroughModel) => playthroughGetSuccess({playthrough:playthrough})),
                    catchError((err) => of(playthroughGetError({error: err.title})))
                )
            )
        ));

    // add paragraph
    addParagraph$ = createEffect(() =>
        this.action$.pipe(
            ofType(addParagraphBegin),
            switchMap(action => 
                from(this.apiService.client.appendParagraph(action.playthroughId, action.paragraph)).pipe(
                    map((paragraph) => addParagraphSuccess({paragraph})),
                    catchError((err) => of(addParagraphError({error: err.title})))
                ) 
            ),            
        )
    );

    // delete last paragraph
    deleteLastParagraph$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteLastParagraphBegin),
            switchMap(action =>
                from(this.apiService.client.deleteLastParagraph(action.playthroughId)).pipe(
                    map((deletedParagraphId) => deleteLastParagraphSuccess({deletedParagraphId})),
                    catchError((err) => of(deleteLastParagraphError({error: err.title})))
                )
            )
        )
    );

    // change paragraph number
    changeParagraphNumber$ = createEffect(() =>
        this.action$.pipe(
         ofType(paragraphNumberChangeBegin),
            switchMap(action => {
                let paragraph: PlayThroughParagraphModel = this.getClonedSelectedParagraph();
                paragraph.number = action.newParagraphNumber;

                return of(updateParagraphBegin({playthroughId: action.playthroughId, paragraph: paragraph}));
            })
        )
    );

    // change description
    changeDescription$ = createEffect(() =>
        this.action$.pipe(
            ofType(descriptionChangeBegin),
            switchMap(action => {
                let paragraph: PlayThroughParagraphModel = this.getClonedSelectedParagraph();
                paragraph.description = action.newDescription;

                return of(updateParagraphBegin({playthroughId: action.playthroughId, paragraph: paragraph}));
            })
        )
    );

    // change items
    changeItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(itemsChangeBegin),
            switchMap(action => {
                let paragraph: PlayThroughParagraphModel = this.getClonedSelectedParagraph();
                paragraph.items = action.newItems;

                return of(updateParagraphBegin({playthroughId: action.playthroughId, paragraph: paragraph}));
            })
        )
    );

    // change position
    changePosition$ = createEffect(() => 
        this.action$.pipe(
            ofType(positionChangeBegin),
            switchMap(action => {
                let paragraph: PlayThroughParagraphModel = _.cloneDeep(action.paragraph);
                paragraph.xPos = action.xPos;
                paragraph.yPos = action.yPos;

                return of(updateParagraphBegin({playthroughId: action.playthroughId, paragraph: paragraph}));
            })
        )
    );

    // change stats
    changeStat$ = createEffect(() =>
        this.action$.pipe(
            ofType(statChangeBegin),
            switchMap(action => {
                // get current paragraph and clone it
                let paragraph: PlayThroughParagraphModel = this.getClonedSelectedParagraph();

                let statChanged: boolean = false;
                // update its stat
                for(let i = 0; i < paragraph.stats.length; i++) {
                    if (paragraph.stats[i].statId == action.statId) {
                        paragraph.stats[i].value = action.newValue;
                        statChanged = true;
                        break;
                    }
                }

                if (!statChanged) {
                    throw `Couldn't find stat ${action.statId} in paragraph ${paragraph.id}`;
                }

                // update this stat on backend
                return of(updateParagraphBegin({playthroughId: action.playthroughId, paragraph: paragraph}));
            })
        )
    );

    // update paragraph
    updateParagraph$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateParagraphBegin),
            switchMap(action =>
                from(this.apiService.client.updateParagraph(action.playthroughId, action.paragraph)).pipe(
                    map(() => updateParagraphSuccess({paragraph: action.paragraph})),
                    catchError((err) => of(updateParagraphError({error: err.title})))
                )
            )
        )
    )

    private getClonedSelectedParagraph() :PlayThroughParagraphModel {
        // get current paragraph and clone it
        let paragraph: PlayThroughParagraphModel;
        this.state.pipe(select(selectedParagraphSelector))
            .subscribe(selectedParagraph => paragraph = _.cloneDeep(selectedParagraph));
        
        return paragraph;
    }
}
