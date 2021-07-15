import { TestBed } from '@angular/core/testing';

import { DataElementFieldsProviderService } from './data-element-fields-provider.service';

describe('DataElementFieldsProviderService', () => {
  let service: DataElementFieldsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataElementFieldsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
