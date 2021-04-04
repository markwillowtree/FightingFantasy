import { createSelector } from "@ngrx/store";
import { AppState} from './app.state';
import {PlayThroughModel, PlayThroughParagraphModel  } from '../services/apiClient';

export const playthroughSelector = createSelector(
    (state: AppState) => state.playthrough,
    function(playthrough: PlayThroughModel) {
        return playthrough;
    }
);

export const selectedParagraphSelector = createSelector(
    (state: AppState) => state.selectedParagraph,
    function(selectedParagraph: PlayThroughParagraphModel) {
        return selectedParagraph;
    }
);

export const groupedStatsSelector = createSelector(
    (state: AppState) => state.selectedParagraph,
    function(selectedParagraph: PlayThroughParagraphModel) {
        let groupedStats = [];
        for(let i = 0; i < selectedParagraph.stats.length; i++) {
            let index = Math.floor(i / 4);
            if (groupedStats[index] == undefined) {
                groupedStats[index] = [];
            }
            groupedStats[index].push(selectedParagraph.stats[i]);
        }

        return groupedStats;
    }
)