import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        AuthGuard,
        { provide: Router, useValue: router }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Should be able to hit route when user is logged in', () => {
    guard.isLoggedinUser = true;
    expect(guard.canActivate(route, state)).toBe(true);
  });

  it('Should NOT be able to hit route when user is NOT logged in', () => {
    guard.isLoggedinUser = false;
    expect(guard.canActivate(route, state)).toBe(false);
  });

});
