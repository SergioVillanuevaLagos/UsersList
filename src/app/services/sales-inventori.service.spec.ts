import { TestBed } from '@angular/core/testing';

import { SalesInventoriService } from './sales-inventori.service';

describe('SalesInventoriService', () => {
  let service: SalesInventoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesInventoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
