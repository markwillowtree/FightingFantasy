import {createAction, props} from '@ngrx/store';
import { PlayThroughParagraphModel } from '../services/apiClient';

export const addParagraph = createAction(
    '[Paragraph] Add',
    props<{ paragraphId: number }>()
);

export const deleteLastParagraph = createAction(
    '[Paragraph] Delete'
);

export const paragraphSelected = createAction(
    '[Paragraph] Selected',
    props<PlayThroughParagraphModel>()
);