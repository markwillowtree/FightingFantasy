import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { playthroughAddParagraphBegin, playthroughAddParagraphError, playthroughAddParagraphSuccess, playthroughGetBegin, playthroughGetError, playthroughGetSuccess } from './playthough.actions';

@Injectable()
export class PlaythroughEffects {
    constructor(private apiService: ApiService, private action$: Actions) {        
    }

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
}
