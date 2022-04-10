import { TestBed } from '@angular/core/testing';

import { SubjectsService } from './subjects.service';

describe('SubjectsService', () => {
  let service: SubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[]
    });
    service = TestBed.inject(SubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loggedIn status', () => {
    let value;
    service.setUserLoginStatus(true);
    service.isLoggedInBehaviourSub.subscribe(v=> {
      value = v;
    })
    expect(value).toBeTruthy();
  });
});
