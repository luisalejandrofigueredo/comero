/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Services/pythonsocketService } from './services/pythonsocket.service';

describe('Service: Services/pythonsocket', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services/pythonsocketService]
    });
  });

  it('should ...', inject([Services/pythonsocketService], (service: Services/pythonsocketService) => {
    expect(service).toBeTruthy();
  }));
});
