import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AppState } from './app.state';
import { addParagraphBegin, addParagraphError, addParagraphSuccess, deleteLastParagraphBegin, deleteLastParagraphError, deleteLastParagraphSuccess, descriptionChangeBegin, descriptionChangeError, descriptionChangeSuccess, playthroughGetBegin, playthroughGetError, playthroughGetSuccess, paragraphNumberChangeBegin, paragraphNumberChangeError, paragraphNumberChangeSuccess, itemsChangeBegin, itemsChangeSuccess, itemsChangeError } from './playthough.actions';

@Injectable()
export class PlaythroughEffects {
    constructor(private apiService: ApiService, private action$: Actions) {        
    }

    // get playthrough
    loadPlaythrough$ = createEffect(() => 
        this.action$.pipe(
            ofType(playthroughGetBegin),
            switchMap(action => 
                from(this.apiService.client.getPlaythrough(action.playthroughId)).pipe(
                    map((playthrough) => playthroughGetSuccess(playthrough)),
                    catchError((err) => of(playthroughGetError(err)))
                )
            )
        ));

    // add paragraph
    addParagraph$ = createEffect(() =>
        this.action$.pipe(
            ofType(addParagraphBegin),
            switchMap(action => 
                from(this.apiService.client.appendParagraph(action.playthroughId, action.paragraph)).pipe(
                    map((paragraph) => addParagraphSuccess(paragraph)),
                    catchError((err) => of(addParagraphError(err)))
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
            switchMap(action => 
                from(this.apiService.client.updateParagraphNumber(action.playthroughId, action.paragraphId, action.newParagraphNumber)).pipe(
                    map(() => paragraphNumberChangeSuccess({newParagraphNumber: action.newParagraphNumber})),
                    catchError((err) => of(paragraphNumberChangeError({error: err.title})))
                )
            )
        )
    );

    // change description
    changeDescription$ = createEffect(() =>
        this.action$.pipe(
            ofType(descriptionChangeBegin),
            switchMap(action =>
                from(this.apiService.client.updateDescription(action.playthroughId, action.paragraphId,  action.newDescription)).pipe(
                    map(() => descriptionChangeSuccess({newDescription: action.newDescription})),
                    catchError((err) => of(descriptionChangeError({error: err.title})))
                ) 
            )
        )
    );

    // change items
    changeItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(itemsChangeBegin),
            switchMap(action =>
                from(this.apiService.client.updateItems(action.playthroughId, action.paragraphId, action.newItems)).pipe(
                    map(() => itemsChangeSuccess({newItems: action.newItems})),
                    catchError((err) => of(itemsChangeError({error: err.title})))
                )
            )
        )
    );
}
