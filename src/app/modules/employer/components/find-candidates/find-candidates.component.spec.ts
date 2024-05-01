import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCandidatesComponent } from './find-candidates.component';

describe('FindCandidatesComponent', () => {
  let component: FindCandidatesComponent;
  let fixture: ComponentFixture<FindCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
