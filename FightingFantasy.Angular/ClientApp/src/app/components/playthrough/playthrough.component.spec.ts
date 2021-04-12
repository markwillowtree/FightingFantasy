import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {provideMockStore} from '@ngrx/store/testing'

import { PlaythroughComponent } from './playthrough.component';

import { AppState, PlaythroughState } from 'src/app/state/app.state';
import { BookModel, Client, PlayThroughModel, PlayThroughParagraphModel, PlaythroughStatModel } from 'src/app/services/apiClient';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PlaythroughEffects } from 'src/app/state/playthrough.effects';
import { playthroughReducer } from 'src/app/state/playthrough.reducer';

describe('PlaythroughComponent', () => {
  let component: PlaythroughComponent;
  let fixture: ComponentFixture<PlaythroughComponent>;

  // create book
  let book = new BookModel(
    {
      id: 1,
      code: 'FF1',
      description: 'Warlock of Firetop Mountain',
      title:  'Warlock of Firetop Mountain',
      stats: ['Stamina']
    }
  );

  // create stat
  let stat = new PlaythroughStatModel(
    {
      statId: 1,
      bookStatId: 1,
      initModifier: 0,
      initNumDice: 2,
      name: 'Stamina',
      value: 20
    }
  );

  // create paragraph
  let paragraph = new PlayThroughParagraphModel(
    {
      id: 1,
      description: 'start',
      items: '',
      number: 1,
      stats: [stat]
    }
  );

  // create playthrough
  let playthrough = new PlayThroughModel(
    {
      startParagraph: paragraph,
      book: book
    }
  );

  let playthroughState = new PlaythroughState(playthrough, paragraph);
  const initialState: AppState = {
    playthrough: playthroughState,    
  };

  // mock api service stub
  let apiServiceStub: Partial<ApiService> = {};

  // activated route stub
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({playthrough: playthroughReducer}),
        EffectsModule.forRoot([PlaythroughEffects]),      
    ],
      declarations: [ PlaythroughComponent ],
      providers: [
        provideMockStore({initialState}),
        { provide: ApiService, useValue: apiServiceStub },
        { provide: ActivatedRoute, useValue: { params: of({playthroughId: 1})}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    activatedRoute.setParamMap({id: playthrough.id});
    fixture = TestBed.createComponent(PlaythroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form after initialisation', () => {
    component.ngOnInit();

    let componentElement: HTMLElement = fixture.nativeElement;
    let form: HTMLFormElement = componentElement.querySelector('form');

    expect(form).toBeTruthy();
  });

  it('form should display selected paragraph values', () => {
    // arrange    
    apiServiceStub.client = new Client();
    apiServiceStub.client.getPlaythrough = (playthroughId) => {
      return Promise.resolve(playthrough);
    }

    // act
    component.ngOnInit();

    // assert
    let componentElement: HTMLElement = fixture.nativeElement;
    let paragraphDescriptionInput : HTMLInputElement = componentElement.querySelector('#paragraphDescription');
    let paragraphNumberInput : HTMLInputElement = componentElement.querySelector('#paragraphNumber');
    let staminaInput : HTMLInputElement = componentElement.querySelector('#Stamina');
    let itemsInput: HTMLInputElement = componentElement.querySelector('#items');

    expect(paragraphDescriptionInput.value).toEqual(paragraph.description);
    expect(paragraphNumberInput.value).toEqual(paragraph.number.toString());
    expect(staminaInput.value).toEqual(stat.value.toString());
    expect(itemsInput.value).toEqual(paragraph.items);
  });

});
