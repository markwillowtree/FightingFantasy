import { createReducer, on, Action } from '@ngrx/store';
import { 
    addParagraphError, addParagraphSuccess, 
    deleteLastParagraphError, deleteLastParagraphSuccess, 
    playthroughGetError, playthroughGetSuccess, 
    selectParagraph, 
    updateParagraphSuccess, updateParagraphError 
} from './playthough.actions';
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
    on(addParagraphSuccess, function(state, paragraph: PlayThroughParagraphModel) {
        let newState: PlaythroughState = lodash.cloneDeep(state);
        let lastParagraph  : PlayThroughParagraphModel = newState.getLastParagraph();
        
        lastParagraph.toParagraph = paragraph;
        lastParagraph.toParagraphId = paragraph.id;

        return newState;
    }),
    on(addParagraphError, function(state, error) {
        alert(error.error);
        return state;
    }),

    // delete paragraph
    on(deleteLastParagraphSuccess, function(state, props) {
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
    on(deleteLastParagraphError, function(state, error) {
        alert(error.error);
        return state;
    }),

    // paragraph selected
    on(selectParagraph, function(state, props)  {
        let newState = lodash.cloneDeep(state);
        
        newState.selectedParagraph = newState.getParagraphById(props.paragraphId);

        return newState;
    }),

    // paragraph update
    on(updateParagraphSuccess, function(state, props) {
        let newState = lodash.cloneDeep(state);
        newState.replaceParagraph(props.paragraph);
        newState.selectedParagraph = props.paragraph;
        return newState;
    }),
    on(updateParagraphError, function(state, error) {
        alert(error.error);
        return state;
    }),

);