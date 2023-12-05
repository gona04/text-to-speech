import { TestBed } from '@angular/core/testing';

import { MySharedLibService } from './my-shared-lib.service';

describe('MySharedLibService', () => {
  let service: MySharedLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySharedLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
