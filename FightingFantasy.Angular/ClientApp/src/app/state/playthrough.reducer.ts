import { createReducer, on, Action } from '@ngrx/store';
import { playthroughAddParagraphError, playthroughAddParagraphSuccess, playthroughGetError, playthroughGetSuccess } from './playthough.actions';
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';
import * as lodash from 'lodash';

export const initialState : PlayThroughModel = null;

export const playthroughReducer = createReducer(
    initialState,
    on(playthroughGetSuccess, function(state, playthrough: PlayThroughModel){
        return playthrough;
    }),
    on(playthroughGetError, function(state, error) {
        alert(error.error);
        
        return state;
    }),
    on(playthroughAddParagraphSuccess, function(state, paragraph: PlayThroughParagraphModel) {
        let newState: PlayThroughModel;

        newState = lodash.cloneDeep(state);
        let currParagraph = newState.startParagraph;
        while(currParagraph.toParagraph != undefined) {
            currParagraph = currParagraph.toParagraph;
        }

        currParagraph.toParagraph = paragraph;
        currParagraph.toParagraphId = paragraph.id;

        return newState;
    }),
    on(playthroughAddParagraphError, function(state, error) {
        alert(error.error);
        return state;
    })
);