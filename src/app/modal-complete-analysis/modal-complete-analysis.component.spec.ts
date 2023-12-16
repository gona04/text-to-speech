import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCompleteAnalysisComponent } from './modal-complete-analysis.component';
import { DairyEntriesService } from '../dairy-entries.service';
import { of } from 'rxjs';

describe('ModalCompleteAnalysisComponent', () => {
  let component: ModalCompleteAnalysisComponent;
  let fixture: ComponentFixture<ModalCompleteAnalysisComponent>;
  let dairyEntriesServiceSpy: jasmine.SpyObj<DairyEntriesService>;

  beforeEach(() => {
    dairyEntriesServiceSpy = jasmine.createSpyObj('DairyEntriesService', ['getAnalysisData', 'setAnalysisModalView']);

    TestBed.configureTestingModule({
      declarations: [ModalCompleteAnalysisComponent],
      providers: [{ provide: DairyEntriesService, useValue: dairyEntriesServiceSpy }]
    });

    fixture = TestBed.createComponent(ModalCompleteAnalysisComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAnalysisData and set data on ngOnInit', () => {
    const mockAnalysisData = { /* your mock analysis data */ };
    dairyEntriesServiceSpy.getAnalysisData.and.returnValue(of(mockAnalysisData));

    component.ngOnInit();

    expect(dairyEntriesServiceSpy.getAnalysisData).toHaveBeenCalledOnceWith();
    expect(component.data).toEqual(mockAnalysisData);
  });

  it('should call print when printPage is called', () => {
    spyOn(window, 'print');
    component.printPage();
    expect(window.print).toHaveBeenCalledOnceWith();
  });

  it('should call setAnalysisModalView with false on close', () => {
    component.close();
    expect(dairyEntriesServiceSpy.setAnalysisModalView).toHaveBeenCalledOnceWith(false);
  });
});
