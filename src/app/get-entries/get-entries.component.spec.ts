import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GetEntriesComponent } from './get-entries.component';
import { DairyEntriesService } from '../dairy-entries.service';
import { AudioLibraryService } from 'projects/audio-library/src/public-api';
import { Router } from '@angular/router';
import { DairyEntries } from '../models/diaryEntries';

describe('GetEntriesComponent', () => {
  let component: GetEntriesComponent;
  let fixture: ComponentFixture<GetEntriesComponent>;
  let dairyEntriesServiceSpy: jasmine.SpyObj<DairyEntriesService>;
  let audioLibraryServiceSpy: jasmine.SpyObj<AudioLibraryService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    dairyEntriesServiceSpy = jasmine.createSpyObj('DairyEntriesService', ['getDairyEntries', 'getCompleteAnalysis']);
    audioLibraryServiceSpy = jasmine.createSpyObj('AudioLibraryService', ['sendDataTobeEdited']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [GetEntriesComponent],
      providers: [
        { provide: DairyEntriesService, useValue: dairyEntriesServiceSpy },
        { provide: AudioLibraryService, useValue: audioLibraryServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(GetEntriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all entries on initialization', () => {
    const mockEntries: DairyEntries[] = [{
      id: 0,
      text: 'Hello my day was okay',
      userName: 'Goonja',
      createdAt: new Date().toString(),
      createdAtTime: new Date().toString()
     }];
    dairyEntriesServiceSpy.getDairyEntries.and.returnValue(of(mockEntries));

    component.ngOnInit();

    expect(component.diaryEntries).toEqual(mockEntries);
  });

  it('should format date and time for each entry', () => {
    const mockEntries: DairyEntries[] = [{ id: 0, text: 'what is the time ?', userName: 'Goonja'. createdAt: new Date() }];
    dairyEntriesServiceSpy.getDairyEntries.and.returnValue(of(mockEntries));

    component.ngOnInit();

    const formattedDate = component.diaryEntries[0].createdAt;
    const formattedTime = component.diaryEntries[0].createdAtTime;

    expect(formattedDate).toBeDefined();
    expect(formattedTime).toBeDefined();
  });

  it('should call getCompleteAnalysis and set analysis modal view on getTheAnalysis', () => {
    const mockAnalysisResult = { /* your mock analysis data */ };
    dairyEntriesServiceSpy.getCompleteAnalysis.and.returnValue(of(mockAnalysisResult));

    component.getTheAnalysis();

    expect(dairyEntriesServiceSpy.getCompleteAnalysis).toHaveBeenCalledOnceWith();
    expect(audioLibraryServiceSpy.setAnalysisModalView).toHaveBeenCalledOnceWith(true, mockAnalysisResult);
  });

  it('should navigate to home and send data to be edited on getDataThatNeedsTobeEdited', () => {
    const mockData = { /* your mock data */ };

    component.getDataThatNeedsTobeEdited(mockData);

    expect(audioLibraryServiceSpy.sendDataTobeEdited).toHaveBeenCalledOnceWith(mockData);
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['home']);
  });
});
