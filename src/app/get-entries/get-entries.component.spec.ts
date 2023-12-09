import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetEntriesComponent } from './get-entries.component';
import { DairyEntriesService } from '../dairy-entries.service';
import { of } from 'rxjs';
import { DairyEntries } from '../models/diaryEntries';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('GetEntriesComponent', () => {
  let component: GetEntriesComponent;
  let fixture: ComponentFixture<GetEntriesComponent>;
  let dairyEntriesService: jasmine.SpyObj<DairyEntriesService>;

  const response: DairyEntries[] = [
    { id: 1, text: 'Sample text', userName: 'JohnDoe', createdAt: '2023-01-01T12:34:56', createdAtTime: '12:34:56' }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DairyEntriesService', ['getDairyEntries']);

    TestBed.configureTestingModule({
      declarations: [GetEntriesComponent],
      providers: [{ provide: DairyEntriesService, useValue: spy }],
      imports: [HttpClientTestingModule, HttpClientModule],
    });

    fixture = TestBed.createComponent(GetEntriesComponent);
    component = fixture.componentInstance;
    dairyEntriesService = TestBed.inject(DairyEntriesService) as jasmine.SpyObj<DairyEntriesService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get all entries on ngOnInit', () => {
    // Arrange
    dairyEntriesService.getDairyEntries.and.returnValue(of(response));

    // Act
    component.ngOnInit();

    // Assert
    expect(dairyEntriesService.getDairyEntries).toHaveBeenCalled();
    expect(component.diaryEntries).toEqual(response);
  });
});
