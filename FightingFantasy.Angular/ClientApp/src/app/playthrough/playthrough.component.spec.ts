import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaythroughComponent } from './playthrough.component';

describe('PlaythroughComponent', () => {
  let component: PlaythroughComponent;
  let fixture: ComponentFixture<PlaythroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaythroughComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaythroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
