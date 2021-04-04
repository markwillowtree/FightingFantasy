import {PlayThroughModel, PlayThroughParagraphModel} from '../services/apiClient';

export interface AppState {
    playthrough: PlayThroughModel;
    selectedParagraph: PlayThroughParagraphModel;
}