import { TestBed } from '@angular/core/testing';

import { ApiMemoService } from './api-memo.service';

describe('ApiMemoService', () => {
  let service: ApiMemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
