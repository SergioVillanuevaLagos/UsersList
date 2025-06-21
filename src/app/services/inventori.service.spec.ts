import { TestBed } from '@angular/core/testing';

import { InventoriService } from './inventori.service';

describe('InventoriService', () => {
  let service: InventoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
