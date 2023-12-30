import { TestBed } from '@angular/core/testing';

import { ConfSerialService } from './conf-serial.service';

describe('ConfSerialService', () => {
  let service: ConfSerialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfSerialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
