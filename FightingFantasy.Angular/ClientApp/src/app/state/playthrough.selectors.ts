import { createSelector } from "@ngrx/store";
import { AppState} from './app.state';
import {PlayThroughModel, PlayThroughParagraphModel  } from '../services/apiClient';

export const playthroughSelector = createSelector(
    (state: AppState) => state.playthrough,
    function(playthrough: PlayThroughModel) {
        return playthrough;
    }
);

export const lastParagraphSelector = createSelector(
    (state: AppState) => state.playthrough,
    function(playthrough: PlayThroughModel) {
        let currParagraph = playthrough.startParagraph;

        while (currParagraph.toParagraph != undefined) {
            currParagraph = currParagraph.toParagraph;
        }

        return currParagraph;
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

export const cyElementsSelector = createSelector(
    (state:AppState) => state.playthrough,
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
                position: { x: currParagraph.xPos, y: currParagraph.yPos}
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