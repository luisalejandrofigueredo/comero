import { TestBed } from '@angular/core/testing';

import { MathCalculusService } from './math-calculus.service';

describe('MathCalculusService', () => {
  let service: MathCalculusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathCalculusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
