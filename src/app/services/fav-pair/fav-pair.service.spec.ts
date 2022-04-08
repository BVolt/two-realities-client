import { TestBed } from '@angular/core/testing';

import { FavPairService } from './fav-pair.service';

describe('FavPairService', () => {
  let service: FavPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
