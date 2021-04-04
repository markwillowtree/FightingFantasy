import { createReducer, on, Action } from '@ngrx/store';
import {paragraphSelected} from './paragraph.actions';
import { PlayThroughParagraphModel } from '../services/apiClient';

export const initialState: PlayThroughParagraphModel = null;

export const paragraphReducer = createReducer(
    initialState,
    on(paragraphSelected, (state, paragraph) => paragraph)
);

