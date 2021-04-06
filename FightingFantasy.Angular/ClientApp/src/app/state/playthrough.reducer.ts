import { createReducer, on, Action } from '@ngrx/store';
import { playthroughAddParagraphError, playthroughAddParagraphSuccess, playthroughDeleteLastParagraphError, playthroughDeleteLastParagraphSuccess, playthroughGetError, playthroughGetSuccess } from './playthough.actions';
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';
import * as lodash from 'lodash';

export const initialState : PlayThroughModel = null;

export const playthroughReducer = createReducer(
    initialState,

    // playthrough get
    on(playthroughGetSuccess, function(state, playthrough: PlayThroughModel){
        return playthrough;
    }),
    on(playthroughGetError, function(state, error) {
        alert(error.error);
        
        return state;
    }),

    // add paragraph
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
    }),
    on(playthroughDeleteLastParagraphSuccess, function(state) {
        let newState = lodash.cloneDeep(state);
        let prevParagraph = newState.startParagraph;
        let currParagraph = prevParagraph.toParagraph;

        while(currParagraph.toParagraph != undefined) {
            prevParagraph = currParagraph;
            currParagraph = currParagraph.toParagraph;
        }

        currParagraph = undefined;
        prevParagraph.toParagraph = undefined;
        prevParagraph.toParagraphId = undefined;

        return newState;
    }),
    on(playthroughDeleteLastParagraphError, function(state, error) {
        alert(error.error);
        return state;
    })
);