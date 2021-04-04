import {createAction, props} from '@ngrx/store'
import { PlayThroughModel, PlayThroughParagraphModel } from '../services/apiClient';



export const retrievedPlaythrough = createAction(
    '[Playthrough /API] Retrieve Playthrough Success',
    props<PlayThroughModel>()
);

