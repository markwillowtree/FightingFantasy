import {createAction, props} from '@ngrx/store'
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';


export const playthroughGetBegin = createAction(
    '[Playthrough] - Get Begin',
    props<{playthroughId: number}>()
);

export const playthroughGetSuccess = createAction(
    '[Playthrough] - Get Success',
    props<PlayThroughModel>()
);

export const playthroughGetError = createAction(
    '[Playthrough] - Get Error',
    props<{error: string}>()
)

export const playthroughAddParagraphBegin = createAction(
    '[Playthrough] - Add Paragraph Begin',
    props<{playthroughId: number, paragraph: PlayThroughParagraphModel}>()
);

export const playthroughAddParagraphSuccess = createAction(
    '[Playthrough] - Add Paragraph Success',
    props<PlayThroughParagraphModel>()
);

export const playthroughAddParagraphError = createAction(
    '[Playthrough] - Add Paragraph Fail',
    props<{error: string}>()
)

