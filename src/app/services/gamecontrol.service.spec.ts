import { TestBed } from '@angular/core/testing';

import { GamecontrolService } from './gamecontrol.service';

describe('GamecontrolService', () => {
  let service: GamecontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamecontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
