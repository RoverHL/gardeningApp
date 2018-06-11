import { TestBed, inject } from '@angular/core/testing';

import { FlowergardensService } from './flowergardens.service';

describe('FlowergardensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowergardensService]
    });
  });

  it('should be created', inject([FlowergardensService], (service: FlowergardensService) => {
    expect(service).toBeTruthy();
  }));
});
