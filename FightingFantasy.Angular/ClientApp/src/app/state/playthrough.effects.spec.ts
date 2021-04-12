import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { provideMockActions } from '@ngrx/effects/testing';
import { addParagraphBegin, addParagraphError, addParagraphSuccess, deleteLastParagraphBegin, deleteLastParagraphError, deleteLastParagraphSuccess, playthroughGetBegin, playthroughGetError, playthroughGetSuccess, updateParagraphBegin, updateParagraphError, updateParagraphSuccess } from "./playthough.actions";
import { Client, PlayThroughModel, ProblemDetails } from "../services/apiClient";
import { playthroughFactory } from "src/testing/playthrough-factory";
import { PlaythroughEffects } from "./playthrough.effects";
import { ApiService } from "../services/api.service";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { OidcSecurityServiceStub } from "src/testing/oidc-security-service-stub";
import { StoreModule } from "@ngrx/store";
import { AppState, PlaythroughState } from "./app.state";
import { provideMockStore } from "@ngrx/store/testing";
import { playthroughReducer } from "./playthrough.reducer";

describe('Playthrough Effects', () => {
	let actions: Observable<any>;
	let effects: PlaythroughEffects;
    let apiService: Partial<ApiService> = {};
    let playthrough = playthroughFactory(2,1);
    let playthroughState = new PlaythroughState(playthrough);
    const initialState: AppState = {
        playthrough: playthroughState,    
    };

	beforeEach(async () => {
		await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({playthrough: playthroughReducer}),
            ],
			providers: [
                PlaythroughEffects,
				provideMockActions(() => actions),
                { provide: ApiService, useValue: apiService },
                {provide: OidcSecurityService, useclass: OidcSecurityServiceStub},
                provideMockStore({initialState})
			],
		});

        effects = TestBed.inject(PlaythroughEffects);
	});
    
    describe('PlaythroughGetBegin', () => {
        it('Should return a stream with playthroughGetSuccess action', (done) => {
            const playthrough: PlayThroughModel = playthroughFactory(2,1);
            const action = playthroughGetBegin({playthroughId: playthrough.id});
            const outcome = playthroughGetSuccess({playthrough: playthrough});

            // arrange    
            apiService.client = new Client();
            apiService.client.getPlaythrough = (playthroughId) => {
                return Promise.resolve(playthrough);
                }

            actions = of(action);

            effects.loadPlaythrough$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });
        });

        it('Should return a stream with playthroughError action', (done) => {
            const error: string = 'Unknown playthrough';
            const playthrough: PlayThroughModel = playthroughFactory(2,1);
            const action = playthroughGetBegin({playthroughId: playthrough.id});
            const outcome = playthroughGetError({error: error});

            // arrange    
            apiService.client = new Client();
            apiService.client.getPlaythrough = (playthroughId) => {
                return Promise.reject(new ProblemDetails({
                    title: error
                }));
            }

            actions = of(action);
            effects.loadPlaythrough$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });

        });
    });

    describe('addParagraph', () => {
        it('Should return a stream with addParagraphSuccess action', (done) => {
            const paragraph = playthroughFactory(2,1).startParagraph;
            const action = addParagraphBegin({playthroughId: 1, paragraph: paragraph});
            const outcome = addParagraphSuccess({paragraph: paragraph});
            apiService.client = new Client();
            apiService.client.appendParagraph = (playthroughId, paragraph) => {
                return Promise.resolve(paragraph);
            }
            
            actions = of(action);
            
            effects.addParagraph$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });
        });

        it('Should return a stream with addParagraphError action', (done) => {
            const error: string = 'Unknown playthrough';
            const paragraph = playthroughFactory(2,1).startParagraph;
            const action = addParagraphBegin({playthroughId: 1, paragraph: paragraph});
            const outcome = addParagraphError({error: error});
            apiService.client = new Client();
            apiService.client.appendParagraph = (playthroughId, paragraph) => {
                return Promise.reject(new ProblemDetails({
                    title: error
                }));
            }
            
            actions = of(action);
            
            effects.addParagraph$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });
        });

    });

    describe('deleteLastParagraph', () => {
        it('Should return a stream with deleteParagraphSuccess action', (done) => {
            const action = deleteLastParagraphBegin({playthroughId: 1});
            const outcome = deleteLastParagraphSuccess({deletedParagraphId: 1});
            apiService.client = new Client();
            apiService.client.deleteLastParagraph = (playthroughId) => {
                return Promise.resolve(1);
            }
            
            actions = of(action);
            
            effects.deleteLastParagraph$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });
        });

        it('Should return a stream with deleteLastParagraphError action', (done) => {
            const error: string = 'Unknown playthrough';
            const action = deleteLastParagraphBegin({playthroughId: 1});
            const outcome = deleteLastParagraphError({error: error});
            apiService.client = new Client();
            apiService.client.deleteLastParagraph = (playthroughId) => {
                return Promise.reject(new ProblemDetails({
                    title: error
                }));
            }
            
            actions = of(action);
            
            effects.deleteLastParagraph$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });
        });
    });

    describe('updateParagraph', () => {
        it('Should return a stream with updateParagraphSuccess action', (done) => {
            const paragraph = playthroughFactory(2,1).startParagraph;
            const action = updateParagraphBegin({playthroughId: 1, paragraph: paragraph});
            const outcome = updateParagraphSuccess({paragraph: paragraph});
            apiService.client = new Client();
            apiService.client.updateParagraph = (playthroughId, paragraph) => {
                return Promise.resolve();
            }
            
            actions = of(action);
            
            effects.updateParagraph$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });
        });

        it('Should return a stream with updateParagraphError action', (done) => {
            const paragraph = playthroughFactory(2,1).startParagraph;
            const error: string = 'Unknown playthrough';
            const action = updateParagraphBegin({playthroughId: 1, paragraph: paragraph});
            const outcome = updateParagraphError({error: error});
            apiService.client = new Client();
            apiService.client.updateParagraph = (playthroughId) => {
                return Promise.reject(new ProblemDetails({
                    title: error
                }));
            }
            
            actions = of(action);
            
            effects.updateParagraph$.subscribe(outcomeAction => {
                expect(outcomeAction).toEqual(outcome);
                done();
            });
        });
    });

});
