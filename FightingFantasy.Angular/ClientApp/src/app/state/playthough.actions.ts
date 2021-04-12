import {createAction, props} from '@ngrx/store'
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';

// playthrough - get
export const playthroughGetBegin = createAction(
    '[Playthrough] - Get Begin',
    props<{playthroughId: number}>()
);

export const playthroughGetSuccess = createAction(
    '[Playthrough] - Get Success',
    props<{playthrough: PlayThroughModel}>()
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
    props<{paragraph: PlayThroughParagraphModel}>()
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

// playthrough - paragraph description changed
export const descriptionChangeBegin = createAction(
    '[Paragraph] - Change Description Begin',
    props<{newDescription: string, playthroughId: number, paragraphId: number}>()
)

// playthrough - paragraph description changed
export const itemsChangeBegin = createAction(
    '[Paragraph] - Change Items Begin',
    props<{newItems: string, playthroughId: number, paragraphId: number}>()
)

// stat updated
export const statChangeBegin = createAction(
    '[Paragraph] - Change Stat Begin',
    props<{playthroughId: number, statId: number, newValue: number}>()
)

export const updateParagraphBegin = createAction(
    '[Paragraph] - Update Begin',
    props<{playthroughId: number, paragraph: PlayThroughParagraphModel}>()
)

export const updateParagraphSuccess = createAction(
    '[Paragraph] - Update Success',
    props<{paragraph: PlayThroughParagraphModel}>()
)

export const updateParagraphError = createAction(
    '[Paragraph] - Update Error',
    props<{error: string}>()
)