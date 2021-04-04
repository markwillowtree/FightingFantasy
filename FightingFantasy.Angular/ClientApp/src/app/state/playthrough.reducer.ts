import { createReducer, on, Action } from '@ngrx/store';

import { retrievedPlaythrough } from './playthough.actions';
import { PlayThroughModel } from '../services/apiClient';

export const initialState : PlayThroughModel = null;

export const playthroughReducer = createReducer(
    initialState,
    on(retrievedPlaythrough, (state, playthrough: PlayThroughModel) => playthrough)
);