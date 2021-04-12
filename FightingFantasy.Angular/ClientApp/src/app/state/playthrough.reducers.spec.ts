import { createAction } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { playthroughFactory } from "src/testing/playthrough-factory";
import { BookModel, PlayThroughModel, PlayThroughParagraphModel, PlaythroughStatModel } from "../services/apiClient";
import { PlaythroughState } from "./app.state";
import { addParagraphError, addParagraphSuccess, deleteLastParagraphError, deleteLastParagraphSuccess, playthroughGetBegin, playthroughGetError, playthroughGetSuccess, selectParagraph, updateParagraphError, updateParagraphSuccess } from "./playthough.actions";
import { playthroughReducer } from "./playthrough.reducer";


  
describe('Playthrough Reducer Tests', () => {
    describe('Playthrough Get Tests', () => {

        it('Unknown action should leave state unchanged', () => {
            let newState = playthroughReducer(undefined, createAction('Unknown Action'));
    
            let initialState = new PlaythroughState();
    
            expect(newState).toEqual(initialState);
        });
        
        it('Playthrough Get Begin should set loading and clear error', () => {
            let state = new PlaythroughState();
            state.loading = false;
            state.error = 'some error';

            let getAction = playthroughGetBegin({playthroughId: 1});
            let newState = playthroughReducer(state, getAction);

            expect(newState.loading).toEqual(true);
            expect(newState.error).toEqual(undefined);
        });

        it('Playthrough Get Error should set error and clear loading', () => {
            let state = new PlaythroughState();
            state.loading = false;

            let error = 'Unknown playthrough id';
            let errorAction = playthroughGetError({error: error });
            let newState = playthroughReducer(undefined, errorAction);
    
            expect(newState.error).toEqual(error);
            expect(newState.loading).toEqual(false);
        });
        
        it('Playthrough Get Success should clear loading and error and set playthrough and selected paragraph', () => {
            let playthrough = playthroughFactory(1, 1);
            let state = new PlaythroughState(playthrough);
            state.loading = true;
            state.error = 'some error';

            let getAction = playthroughGetSuccess({playthrough: playthrough});
            let newState = playthroughReducer(state, getAction);
            
            expect(newState.loading).toEqual(false);
            expect(newState.error).toEqual(undefined);
            expect(newState.playthrough).toEqual(playthrough);
            expect(newState.selectedParagraph).toEqual(playthrough.startParagraph);
        });
    }),

    describe('Add Paragraph Tests', () => {

        it('Add Paragraph Success should clear loading and error and set selected paragraph', () => {
            let playthrough = playthroughFactory(1, 1);
            let state = new PlaythroughState(playthrough);
            state.loading = true;
            state.error = 'some error';
            let newParagraph = new PlayThroughParagraphModel({
                id: 3
            });

            let action = addParagraphSuccess({paragraph: newParagraph});
            let newState = playthroughReducer(state, action);

            expect(newState.loading).toEqual(false);
            expect(newState.error).toEqual(undefined);
            expect(newState.selectedParagraph).toEqual(newParagraph);
        });

        it('Add Paragraph Error should set error and clear loading', () => {
            let state = new PlaythroughState();
            state.loading = true;

            let error = 'Unknown playthrough id';
            let errorAction = addParagraphError({error: error });
            let newState = playthroughReducer(undefined, errorAction);
    
            expect(newState.error).toEqual(error);
        });

    }),

    describe('Delete Last Paragraph', () => {

        it('Delete Last Paragraph Success should clear loading and error and set selected paragraph', () => {
            let playthrough = playthroughFactory(2, 1);
            let state = new PlaythroughState(playthrough);
            state.loading = true;
            state.error = 'some error';

            let action = deleteLastParagraphSuccess({deletedParagraphId: 1});
            let newState = playthroughReducer(state, action);

            expect(newState.loading).toEqual(false);
            expect(newState.error).toEqual(undefined);
            expect(newState.selectedParagraph.id).toEqual(playthrough.startParagraph.id);
            expect(newState.selectedParagraph.toParagraph).toEqual(undefined);
            expect(newState.selectedParagraph.toParagraphId).toEqual(undefined);
        });

        it('Delete Last Paragraph Error should set error and clear loading property', () => {
            let error = 'Unknown playthrough id';
            let errorAction = deleteLastParagraphError({error: error });
            let newState = playthroughReducer(undefined, errorAction);
    
            expect(newState.error).toEqual(error);
            expect(newState.loading).toEqual(false);
        });

    });

    describe('Select Paragraph', () => {
        it('SelectParagraph should set correct selected paragraph', () => {
            let playthrough = playthroughFactory(2, 1);
            let state = new PlaythroughState(playthrough);
            let paragraphToSelect = state.getParagraphById(1);

            state.loading = true;
            state.error = 'some error';

            let action = selectParagraph({paragraphId: 1});
            let newState = playthroughReducer(state, action);

            expect(newState.selectedParagraph).toEqual(paragraphToSelect);
        });
    });

    describe('Update Paragraph', () => {
        it('UpdateParagraphSuccess should update paragraph correctly', () => {
            let playthrough = playthroughFactory(2, 1);
            let state = new PlaythroughState(playthrough);
            let paragraphToUpdate= state.getParagraphById(1);
            paragraphToUpdate.description = 'updated description';
            paragraphToUpdate.items = 'updated items';
            paragraphToUpdate.number = 999;
            paragraphToUpdate.stats[0].initModifier = 999;
            paragraphToUpdate.stats[0].initNumDice = 999;
            paragraphToUpdate.stats[0].name = 'updated stat name';
            paragraphToUpdate.stats[0].value = 999;
            paragraphToUpdate.xPos = 999;
            paragraphToUpdate.yPos = 999;

            state.loading = true;
            state.error = 'some error';

            let action = updateParagraphSuccess({paragraph: paragraphToUpdate});
            let newState = playthroughReducer(state, action);

            expect(newState.selectedParagraph).toEqual(paragraphToUpdate);
        });

        it('UpdateParagraph Error should set error and clear loading property', () => {
            let error = 'Unknown paragraph id';
            let errorAction = updateParagraphError({error: error });
            let newState = playthroughReducer(undefined, errorAction);
    
            expect(newState.error).toEqual(error);
            expect(newState.loading).toEqual(false);
        });
    });
    
})