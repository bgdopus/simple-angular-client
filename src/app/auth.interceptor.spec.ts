import { HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let request: HttpRequest<unknown>;
  let next: HttpHandler;
  let authInterceptor: AuthInterceptor;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      AuthInterceptor,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
  }));

  beforeEach(() => {
    authInterceptor = TestBed.inject(AuthInterceptor);
  })

  it('should be created', () => {
    authInterceptor = TestBed.inject(AuthInterceptor);
    expect(authInterceptor).toBeTruthy();
  });

  xit('Should set Authorization in header', () => {
    authInterceptor = TestBed.inject(AuthInterceptor);
    console.log('55555555555555555555555555555555555', request, next);
    // authInterceptor.intercept(request, next);
    // localStorage.setItem('token', 'tokeen dummy');
    const authToken = localStorage.getItem('token')!;
    // const authReq = request.clone({
    //   headers: request.headers.set('Authorization', authToken)
    // });

    // console.log('authInterceptor.intercept(request, next);', authInterceptor.intercept(request, next));

    expect(request.headers).toContain('Authorization');
  });

});
