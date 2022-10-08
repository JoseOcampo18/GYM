import { TestBed } from '@angular/core/testing';

import { AparatosService } from './aparatos.service';

describe('AparatosService', () => {
  let service: AparatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AparatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
