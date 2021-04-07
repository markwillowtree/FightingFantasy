import { createReducer, on, Action } from '@ngrx/store';
import { addParagraphError, addParagraphSuccess, deleteLastParagraphError, deleteLastParagraphSuccess, descriptionChangeError, descriptionChangeSuccess, playthroughGetError, playthroughGetSuccess, paragraphNumberChangeError, paragraphNumberChangeSuccess, selectParagraph, itemsChangeSuccess, itemsChangeError } from './playthough.actions';
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

    // change paragraph number
    on(paragraphNumberChangeSuccess,function(state, props) {
        let newState = lodash.cloneDeep(state);
        newState.selectedParagraph.number = props.newParagraphNumber;
        return newState;
    }),
    on(paragraphNumberChangeError, function(state, error) {
        alert(error.error);
        return state;
    }),

    // change description
    on(descriptionChangeSuccess, function(state, props) {
        let newState = lodash.cloneDeep(state);
        newState.selectedParagraph.description = props.newDescription;
        return newState;
    }),

    on(descriptionChangeError, function(state, error) {
        alert(error.error);
        return state;
    }),

    // change items
    on(itemsChangeSuccess, function(state, props) {
        let newState = lodash.cloneDeep(state);
        newState.selectedParagraph.items = props.newItems;
        return newState;
    }),
    on(itemsChangeError, function(state, error) {
        alert(error.error);
        return state;
    }),
);