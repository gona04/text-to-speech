import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompleteAnalysisComponent } from './modal-complete-analysis.component';

describe('ModalCompleteAnalysisComponent', () => {
  let component: ModalCompleteAnalysisComponent;
  let fixture: ComponentFixture<ModalCompleteAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCompleteAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCompleteAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
