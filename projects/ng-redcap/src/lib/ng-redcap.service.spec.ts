import { TestBed } from '@angular/core/testing';

import { NgRedcapService } from './ng-redcap.service';

describe('NgRedcapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgRedcapService = TestBed.get(NgRedcapService);
    expect(service).toBeTruthy();
  });
});
