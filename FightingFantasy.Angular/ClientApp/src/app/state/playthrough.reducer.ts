import { createReducer, on, Action } from '@ngrx/store';
import { playthroughAddParagraphError, playthroughAddParagraphSuccess, playthroughDeleteLastParagraphError, playthroughDeleteLastParagraphSuccess, playthroughGetError, playthroughGetSuccess, playthroughSelectParagraph } from './playthough.actions';
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';
import * as lodash from 'lodash';
import { PlaythroughState } from './app.state';

export const initialState : PlaythroughState = new PlaythroughState();

export const playthroughReducer = createReducer(
    initialState,

    // playthrough get
    on(playthroughGetSuccess, function(state, playthrough: PlayThroughModel){
        let newState: PlaythroughState;
        newState = lodash.cloneDeep(state);
        newState.playthrough = playthrough;
        newState.selectedParagraph = playthrough.startParagraph;
        return newState;
    }),
    on(playthroughGetError, function(state, error) {
        alert(error.error);
        console.log(error.error);
        return state;
    }),

    // add paragraph
    on(playthroughAddParagraphSuccess, function(state, paragraph: PlayThroughParagraphModel) {
        let newState: PlaythroughState = lodash.cloneDeep(state);
        let lastParagraph  : PlayThroughParagraphModel = newState.getLastParagraph();
        
        lastParagraph.toParagraph = paragraph;
        lastParagraph.toParagraphId = paragraph.id;

        return newState;
    }),
    on(playthroughAddParagraphError, function(state, error) {
        alert(error.error);
        return state;
    }),

    // delete paragraph
    on(playthroughDeleteLastParagraphSuccess, function(state, props) {
        let newState: PlaythroughState = lodash.cloneDeep(state);

        let last = newState.getLastParagraph();
        let prev = newState.getPreviousParagraph(last);

        if (last.id == props.deletedParagraphId) {
            newState.selectedParagraph = prev;
        }

        last = undefined;
        prev.toParagraph = undefined;
        prev.toParagraphId = undefined;

        return newState;
    }),
    on(playthroughDeleteLastParagraphError, function(state, error) {
        alert(error.error);
        return state;
    }),

    // paragraph selected
    on(playthroughSelectParagraph, function(state, props)  {
        let newState = lodash.cloneDeep(state);
        
        newState.selectedParagraph = newState.getParagraphById(props.paragraphId);

        return newState;
    })
);