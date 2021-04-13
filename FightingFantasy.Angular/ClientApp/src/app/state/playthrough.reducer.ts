import { createReducer, on, Action } from '@ngrx/store';
import { 
    addParagraphError, addParagraphSuccess, 
    deleteLastParagraphError, deleteLastParagraphSuccess, 
    playthroughGetError, playthroughGetSuccess, 
    selectParagraph, 
    updateParagraphSuccess, updateParagraphError, playthroughGetBegin, mapZoomIn, mapZoomOut, mapZoomReset, mapPan 
} from './playthough.actions';
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';
import _ from 'lodash-es';
import { PlaythroughState } from './app.state';

export const initialState : PlaythroughState = new PlaythroughState();

export const playthroughReducer = createReducer(
    initialState,

    // playthrough get
    on(playthroughGetBegin, function(state, playthroughId){
        let newState = _.cloneDeep(state);
        newState.loading = true;
        newState.error = undefined;
        return newState;
    }),

    on(playthroughGetSuccess, function(state, prop: {playthrough: PlayThroughModel}){
        let newState: PlaythroughState;
        newState = _.cloneDeep(state);
        newState.playthrough = prop.playthrough;
        newState.selectedParagraph = prop.playthrough.startParagraph;
        newState.loading = false;
        newState.error = undefined;
        return newState;
    }),
    on(playthroughGetError, function(state, errorAction) {
        let newState: PlaythroughState = _.cloneDeep(state);
        newState.error = errorAction.error;

        console.log(errorAction.error);
        return newState;
    }),

    // add paragraph
    on(addParagraphSuccess, function(state, props) {
        let newState: PlaythroughState = _.cloneDeep(state);
        let lastParagraph  : PlayThroughParagraphModel = newState.getLastParagraph();
        
        lastParagraph.toParagraph = props.paragraph;
        lastParagraph.toParagraphId = props.paragraph.id;

        newState.loading = false;
        newState.error = undefined;
        newState.selectedParagraph = props.paragraph;

        return newState;
    }),
    on(addParagraphError, function(state, errorAction) {
        let newState: PlaythroughState = _.cloneDeep(state);
        newState.error = errorAction.error;
        newState.loading = false;
        return newState;
    }),

    // delete paragraph
    on(deleteLastParagraphSuccess, function(state, props) {
        let newState: PlaythroughState = _.cloneDeep(state);
        newState.loading =false;
        newState.error = undefined;

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
        let newState: PlaythroughState = _.cloneDeep(state);

        newState.error = error.error;
        newState.loading = false;
        return newState;
    }),

    // paragraph selected
    on(selectParagraph, function(state, props)  {
        let newState = _.cloneDeep(state);
        
        newState.selectedParagraph = newState.getParagraphById(props.paragraphId);

        return newState;
    }),

    // paragraph update
    on(updateParagraphSuccess, function(state, props) {
        let newState = _.cloneDeep(state);
        newState.updateParagraph(props.paragraph);
        newState.selectedParagraph = props.paragraph;
        return newState;
    }),
    on(updateParagraphError, function(state, errorAction) {
        let newState = _.cloneDeep(state);
        newState.error = errorAction.error;
        newState.loading = false;
        return newState;
    }),

    // map zoom
    on(mapZoomIn, function(state) {
        let newState = _.cloneDeep(state);
        newState.zoomLevel += 0.1;
        return newState;
    }),

    on(mapZoomOut, function(state) {
        let newState = _.cloneDeep(state);
        newState.zoomLevel -= 0.1;
        return newState;
    }),

    on(mapZoomReset, function(state) {
        let newState = _.cloneDeep(state);
        newState.zoomLevel = 1;
        newState.panX = 0;
        newState.panY = 0;
        return newState;
    }),

    on(mapPan, function(state, props) {
        let newState = _.cloneDeep(state);
        newState.panX = props.x;
        newState.panY = props.y;
        return newState;
    })

);