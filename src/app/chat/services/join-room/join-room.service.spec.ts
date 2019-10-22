import { TestBed } from '@angular/core/testing';

import { JoinRoomService } from './join-room.service';

describe('JoinRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinRoomService = TestBed.get(JoinRoomService);
    expect(service).toBeTruthy();
  });
});
