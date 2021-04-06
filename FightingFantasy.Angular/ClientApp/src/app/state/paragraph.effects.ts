// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { EMPTY, from, Observable, of } from 'rxjs';
// import { catchError, concatMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
// import { ApiService } from '../services/api.service';
// import { AppState } from './app.state';
// import { paragraphSelected } from './paragraph.actions';
// import { selectedParagraphSelector } from './paragraph.selectors';
// import { playthroughDeleteLastParagraphSuccess } from './playthough.actions';
// import { playthroughSelector } from './playthrough.selectors';

// @Injectable()
// export class ParagraphEffects {
//     constructor(private actions$: Actions, private store: Store<AppState>){}

//     checkSelectedParagraphOnDelete$ = createEffect(() => {
//             return this.actions$.pipe(
//                 ofType(playthroughDeleteLastParagraphSuccess),
//                 concatMap(action => of(action).pipe(
//                     withLatestFrom(this.store.select(selectedParagraphSelector), this.store.select(playthroughSelector)),
//                   )),
//                 switchMap(function([action, selectedParagraph, playthrough]) {
//                     // if the deleted paragraph was the currently selected one
//                     if (action.deletedParagraphId == selectedParagraph.id) {
//                         // get the last paragraph from the playthrough
//                         let last = playthrough.startParagraph;
//                         while(last.toParagraph != undefined) {
//                             last = last.toParagraph;
//                         }

//                         return of(paragraphSelected(last));
//                     }

//                     return EMPTY;
//                 })
//             );
//         }
//     );
// }
