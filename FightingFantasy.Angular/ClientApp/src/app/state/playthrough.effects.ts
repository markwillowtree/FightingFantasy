import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AppState } from './app.state';
import { playthroughAddParagraphBegin, playthroughAddParagraphError, playthroughAddParagraphSuccess, playthroughDeleteLastParagraphBegin, playthroughDeleteLastParagraphError, playthroughDeleteLastParagraphSuccess, playthroughGetBegin, playthroughGetError, playthroughGetSuccess, playthroughParagraphNumberChangeBegin, playthroughParagraphNumberChangeError, playthroughParagraphNumberChangeSuccess } from './playthough.actions';

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
            ofType(playthroughAddParagraphBegin),
            switchMap(action => 
                from(this.apiService.client.appendParagraph(action.playthroughId, action.paragraph)).pipe(
                    map((paragraph) => playthroughAddParagraphSuccess(paragraph)),
                    catchError((err) => of(playthroughAddParagraphError(err)))
                ) 
            ),            
        )
    );

    // delete last paragraph
    deleteLastParagraph$ = createEffect(() =>
        this.action$.pipe(
            ofType(playthroughDeleteLastParagraphBegin),
            switchMap(action =>
                from(this.apiService.client.deleteLastParagraph(action.playthroughId)).pipe(
                    map((deletedParagraphId) => playthroughDeleteLastParagraphSuccess({deletedParagraphId})),
                    catchError((err) => of(playthroughDeleteLastParagraphError({error: err.title})))
                )
            )
        )
    );

    // change paragraph number
    changeParagraphNumber$ = createEffect(() =>
        this.action$.pipe(
         ofType(playthroughParagraphNumberChangeBegin),
            switchMap(action => 
                from(this.apiService.client.updateParagraphNumber(action.playthroughId, action.paragraphId, action.newParagraphNumber)).pipe(
                    map(() => playthroughParagraphNumberChangeSuccess({newParagraphNumber: action.newParagraphNumber})),
                    catchError((err) => of(playthroughParagraphNumberChangeError({error: err.title})))
                )
            )
        )
    );
}
