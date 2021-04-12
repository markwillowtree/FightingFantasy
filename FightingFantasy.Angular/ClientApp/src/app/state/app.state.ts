import { UrlResolver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {PlayThroughModel, PlayThroughParagraphModel} from '../services/apiClient';

@Injectable()
export class AppState {
    playthrough: PlaythroughState;
}

export class PlaythroughState {
    playthrough:PlayThroughModel
    selectedParagraph: PlayThroughParagraphModel;
    loading: boolean = false;
    error: string = undefined;
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    
    constructor(playthrough?:PlayThroughModel, selectedParagraph?: PlayThroughParagraphModel) {
        if (playthrough) {
            this.playthrough = playthrough;

            if (selectedParagraph) {
                if (!this.paragraphBelongsToPlaythrough(selectedParagraph)) {
                    throw 'invalid selected paragraph';
                }
                this.selectedParagraph = selectedParagraph;
            } else {
                this.selectedParagraph = playthrough.startParagraph;
            }
        }
    }

    paragraphBelongsToPlaythrough(paragraph: PlayThroughParagraphModel) {
        let curr = this.playthrough.startParagraph;

        while(curr != undefined) {
            if (curr.id== paragraph.id) {
                return true;
            }
                
            curr = curr.toParagraph;
        }

        return false;
    }

    getLastParagraph() : PlayThroughParagraphModel {
        let curr = this.playthrough.startParagraph;
        while(curr.toParagraph != undefined) {
            curr = curr.toParagraph;
        }
        return curr;
    }

    getPreviousParagraph(currParagraph: PlayThroughParagraphModel) : PlayThroughParagraphModel {
        let prev = this.playthrough.startParagraph;

        while(prev.toParagraph != undefined) {
            if (prev.toParagraphId == currParagraph.id) {
                return prev;
            }
            prev = prev.toParagraph;
        }

        throw 'could not find previous paragraph';
    }

    getParagraphById(paragraphId: number) {
        let curr = this.playthrough.startParagraph;

        while(curr != undefined) {
            if (curr.id == paragraphId) {
                return curr;
            }
            curr = curr.toParagraph;
        }

        throw `could not find paragraph with id ${paragraphId}`;
    }

    updateParagraph(newParagraph: PlayThroughParagraphModel) {
        let curr = this.playthrough.startParagraph;
        while(curr != undefined) {
            if (curr.id == newParagraph.id) {
                curr.description = newParagraph.description;
                curr.items = newParagraph.items;
                curr.number = newParagraph.number;
                for(let i = 0; i < curr.stats.length; i++) {
                    curr.stats[i].value = newParagraph.stats[i].value;
                }
                curr.xPos = newParagraph.xPos;
                curr.yPos = newParagraph.yPos;

                return;
            }
            curr = curr.toParagraph;
        }

        throw `could not find paragraph with id ${newParagraph.id}`;
    }
}