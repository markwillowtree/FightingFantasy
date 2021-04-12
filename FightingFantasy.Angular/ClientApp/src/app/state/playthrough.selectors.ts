import { createSelector } from "@ngrx/store";
import { AppState, PlaythroughState} from './app.state';
import {PlayThroughModel, PlayThroughParagraphModel, PlaythroughStatModel  } from '../services/apiClient';

export const errorSelector = createSelector(
    (state: AppState) => state.playthrough,
    function(state: PlaythroughState) {
        return state.error;
    }
);
export const playthroughSelector = createSelector(
    (state: AppState) => state.playthrough,
    function(playthrough: PlaythroughState) {
        return playthrough.playthrough;
    }
);

export const selectedParagraphSelector = createSelector(
    (state: AppState) => state.playthrough,
    (playthrough: PlaythroughState) => playthrough.selectedParagraph
);

export const lastParagraphSelector = createSelector(
    (state: AppState) => state.playthrough,
    function(playthrough: PlaythroughState) {
        return playthrough.getLastParagraph();
    }
);

export const groupedStatsSelector = createSelector(
    (state: AppState) => state.playthrough.selectedParagraph,
    function(selectedParagraph: PlayThroughParagraphModel) {
        let groupedStats :PlaythroughStatModel[][] = [];
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

export const cyElementsSelector = createSelector(
    (state:AppState) => state.playthrough.playthrough,
    function(playthrough: PlayThroughModel) {
        let nodes = [];
        let edges = [];

        if (playthrough == undefined) {
            return nodes;
        }

        let currParagraph: PlayThroughParagraphModel = playthrough.startParagraph;

        while (currParagraph != undefined) {
            nodes.push( 
            {
                group: 'nodes',
                data: { id: currParagraph.id, label: currParagraph.description},
                position: { x: currParagraph.xPos, y: currParagraph.yPos},
                grabbable: true,

             });
             currParagraph = currParagraph.toParagraph;
        }

        for(let i = 1; i < nodes.length; i++) {
            edges.push({
                group: 'edges',
                data: {source: nodes[i -1].data.id, target: nodes[i].data.id}
            });
        }

        return nodes.concat(edges);
    }
)