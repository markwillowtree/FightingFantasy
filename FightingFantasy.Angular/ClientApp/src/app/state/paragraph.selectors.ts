import { createSelector } from "@ngrx/store";
import { AppState} from './app.state';
import {PlayThroughModel, PlayThroughParagraphModel  } from '../services/apiClient';

export const selectedParagraphSelector = createSelector(
    (state: AppState) => state.selectedParagraph,
    function(selectedParagraph: PlayThroughParagraphModel) {
        return selectedParagraph;
    }
);