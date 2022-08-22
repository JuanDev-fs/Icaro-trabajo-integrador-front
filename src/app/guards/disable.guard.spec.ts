import { TestBed } from '@angular/core/testing';

import { DisableGuard } from './disable.guard';

describe('DisableGuard', () => {
  let guard: DisableGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisableGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
