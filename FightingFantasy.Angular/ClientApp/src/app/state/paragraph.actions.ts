import {createAction, props} from '@ngrx/store';
import { PlayThroughParagraphModel } from '../services/apiClient';

export const paragraphAdd = createAction(
    '[Paragraph] Add',
    props<PlayThroughParagraphModel>()
);

export const deleteLastParagraph = createAction(
    '[Paragraph] Delete'
);

export const paragraphSelected = createAction(
    '[Paragraph] Selected',
    props<PlayThroughParagraphModel>()
);