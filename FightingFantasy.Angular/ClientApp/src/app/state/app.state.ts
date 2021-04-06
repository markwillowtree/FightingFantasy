import { Injectable } from '@angular/core';
import {PlayThroughModel, PlayThroughParagraphModel} from '../services/apiClient';

@Injectable()
export class AppState {
    playthrough: PlayThroughModel;
    selectedParagraph: PlayThroughParagraphModel;
}