import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AppState } from './app.state';
import { selectedParagraphSelector } from './paragraph.selectors';
import { playthroughDeleteLastParagraphSuccess } from './playthough.actions';
import { playthroughSelector } from './playthrough.selectors';

@Injectable()
export class ParagraphEffects {
    constructor(private actions$: Actions){}

    // checkSelectedParagraphOnDelete$ = createEffect(
    //     function() {
    //         return this.actions$.pipe(
    //             ofType(playthroughDeleteLastParagraphSuccess),
    //             concatMap(action => of(action).pipe(
    //                 withLatestFrom(this.store.select(selectedParagraphSelector)),
    //                 withLatestFrom(this.store.select(playthroughSelector))
    //               )),
    //             switchMap(function([action, selectedParagraph, playthrough]) {
    //                 if (action.deletedParagraphId == selectedParagraph.id) {
                        
    //                 }

    //                 return EMPTY;
    //             })
    //         );
    //     }
    // );
}
