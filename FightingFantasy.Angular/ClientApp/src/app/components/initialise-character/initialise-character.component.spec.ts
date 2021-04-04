import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialiseCharacterComponent } from './initialise-character.component';

describe('InitialiseCharacterComponent', () => {
  let component: InitialiseCharacterComponent;
  let fixture: ComponentFixture<InitialiseCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialiseCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialiseCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
