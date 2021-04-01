import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaythroughComponent } from './create-playthrough.component';

describe('CreatePlaythroughComponent', () => {
  let component: CreatePlaythroughComponent;
  let fixture: ComponentFixture<CreatePlaythroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlaythroughComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaythroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
