import { TestBed } from '@angular/core/testing';

import { ReferenceDataValuesProviderService } from './reference-data-values-provider.service';

describe('ReferenceDataValuesProviderService', () => {
  let service: ReferenceDataValuesProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceDataValuesProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
