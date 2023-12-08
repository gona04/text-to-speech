import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEntriesComponent } from './get-entries.component';

describe('GetEntriesComponent', () => {
  let component: GetEntriesComponent;
  let fixture: ComponentFixture<GetEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
