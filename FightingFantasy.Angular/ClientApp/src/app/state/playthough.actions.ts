import {createAction, props} from '@ngrx/store'
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';

// playthrough - get
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

// playthrough - add paragraph
export const addParagraphBegin = createAction(
    '[Paragraph] - Add Begin',
    props<{playthroughId: number, paragraph: PlayThroughParagraphModel}>()
);

export const addParagraphSuccess = createAction(
    '[Paragraph] - Add Success',
    props<PlayThroughParagraphModel>()
);

export const addParagraphError = createAction(
    '[Paragraph] - Add Fail',
    props<{error: string}>()
)

// playthrough delete paragraph
export const deleteLastParagraphBegin = createAction(
    '[Paragraph] - Delete Last Begin',
    props<{playthroughId: number}>()
);

export const deleteLastParagraphSuccess = createAction(
    '[Paragraph] - Delete Last Success',
    props<{deletedParagraphId: number}>()
);
export const deleteLastParagraphError= createAction(
    '[Paragraph] - Delete Last Error',
    props<{error: string}>()
);

// playthrough select paragraph
export const selectParagraph = createAction(
    '[Paragraph] - Select',
    props<{paragraphId: number}>()
);

// playthrough - paragraph number changed
export const paragraphNumberChangeBegin = createAction(
    '[Paragraph] - Change Number Begin',
    props<{newParagraphNumber: number, playthroughId: number, paragraphId: number}>()
)
export const paragraphNumberChangeSuccess = createAction(
    '[Paragraph] - Change Number Success',
    props<{newParagraphNumber: number}>()
)
export const paragraphNumberChangeError = createAction(
    '[Paragraph] - Change Number Error',
    props<{error: string}>()
)

// playthrough - paragraph description changed
export const descriptionChangeBegin = createAction(
    '[Paragraph] - Change Description Begin',
    props<{newDescription: string, playthroughId: number, paragraphId: number}>()
)
export const descriptionChangeSuccess = createAction(
    '[Paragraph] - Change Description Success',
    props<{newDescription: string}>()
)
export const descriptionChangeError = createAction(
    '[Paragraph] - Change Description Error',
    props<{error: string}>()
)

// playthrough - paragraph description changed
export const itemsChangeBegin = createAction(
    '[Paragraph] - Change Items Begin',
    props<{newItems: string, playthroughId: number, paragraphId: number}>()
)
export const itemsChangeSuccess = createAction(
    '[Paragraph] - Change Items Success',
    props<{newItems: string}>()
)
export const itemsChangeError = createAction(
    '[Paragraph] - Change Items Error',
    props<{error: string}>()
)