import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    // service = new AuthService(httpClientSpy);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    // httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it("should create user (HttpClient called once)", () => {
    let user = { id: 2, name: 'Ajay K' }
    authService.onCreateUser(user).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: `${environment.apiBaseUrl}/signup` });
    // expect(req.request.method).toEqual('POST');   //both way can check req method
    expect(req.request.body).toEqual(user);
  });

  it('#Signup user should fail on error', () => {
    const user = { username: 'admin@gmail.com', password: 'password' };
    authService.onCreateUser(user).subscribe();
    const req = httpTestingController.expectOne({ method: "POST", url: `${environment.apiBaseUrl}/signup` });
    expect(req.request.method).toBe('POST')
    req.flush('Signup user failed', { status: 500, statusText: 'Interval server error' });
  });

  it("Should login user", () => {
    const user = { username: 'admin@gmail.com', password: 'password' };
    authService.onLoginUser(user).subscribe(data=> {
      expect(data).toBe(user);
    });
    let req = httpTestingController.expectOne({ method: "POST", url: `${environment.apiBaseUrl}/login` });
    req.flush(user)
  });

  it('#Login user should fail on error', () => {
    const user = { username: 'admin@gmail.com', password: 'password' };
    authService.onLoginUser(user).subscribe();
    const req = httpTestingController.expectOne({ method: "POST", url: `${environment.apiBaseUrl}/login` });
    expect(req.request.method).toBe('POST')
    req.flush('Login user failed', { status: 500, statusText: 'Interval server error' });
  });

  // it('should create user (HttpClient called once)', (done: DoneFn) => {
  //   const expectekdProduct = { id: 1, name: 'A' };
  //   httpClientSpy.post.and.returnValue(from([expectekdProduct]));
  //   authService.onCreateUser(expectekdProduct).subscribe({
  //     next: products => {
  //       expect(products).withContext('save expected user').toEqual(expectekdProduct);
  //       done();
  //     },
  //     error: done.fail
  //   });
  //   expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  // });

  
  





});
