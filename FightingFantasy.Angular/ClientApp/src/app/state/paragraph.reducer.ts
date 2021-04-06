import { createReducer, on, Action } from '@ngrx/store';
import {paragraphSelected} from './paragraph.actions';
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';
import { playthroughGetSuccess } from './playthough.actions';

export const initialState: PlayThroughParagraphModel = null;

export const paragraphReducer = createReducer(
    initialState,

    on(paragraphSelected, (state, paragraph) => paragraph),
    on(playthroughGetSuccess, function(state, playthrough: PlayThroughModel){
        return playthrough.startParagraph;
    }),
);

