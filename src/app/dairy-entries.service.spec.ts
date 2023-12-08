import { TestBed } from '@angular/core/testing';

import { DairyEntriesService } from './dairy-entries.service';

describe('DairyEntriesService', () => {
  let service: DairyEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DairyEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
