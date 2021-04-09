import { Injectable } from '@angular/core';
import {PlayThroughModel, PlayThroughParagraphModel} from '../services/apiClient';

@Injectable()
export class AppState {
    playthrough: PlaythroughState;
}

export class PlaythroughState {
    playthrough:PlayThroughModel
    selectedParagraph: PlayThroughParagraphModel;

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

    replaceParagraph(paragraph: PlayThroughParagraphModel) {

        if (this.playthrough.startParagraph.id == paragraph.id) {
            this.playthrough.startParagraph = paragraph;
            return;
        }

        let curr = this.playthrough.startParagraph;
        while(curr.toParagraph != undefined) {
            if (curr.toParagraphId == paragraph.id) {
                curr.toParagraph = paragraph;
                return;
            }
            curr = curr.toParagraph;
        }

        throw `could not find paragraph with id ${paragraph.id}`;
    }
}