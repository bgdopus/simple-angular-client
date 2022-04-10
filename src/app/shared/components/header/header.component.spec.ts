import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { HeaderComponent } from './header.component';

class RouterStub {
  navigate(params: any) {
  }
}

class ActivatedRoutStub {
  params!: Observable<any>;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let routerSpy;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [HeaderComponent],
      providers: [
        // { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
    // router = TestBed.inject(Router)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('Should have links to login page', () => {
    let de = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let linkArr = de.map(el => {
      // console.log('el.properties[href]', el.properties['href'], el.properties['href'].includes('/' || '/products/aalist' || '/auth/login' || '/auth/signup'));
      // console.log('el.properties[href]', el.properties['href'].includes('/'));
      // console.log('el.properties[href]', el.properties['href'].includes('/products/list'));
      // console.log('el.properties[href]', el.properties['href'].includes('/auth/login'));
      // console.log('el.properties[href]', el.properties['href'].includes('/auth/signup'));

      // expect(el.properties['href']).toContain('/' || '/products/list' || '/auth/login' || '/auth/signup')
    })
    expect(component.isUserLoggedIn).toBeFalse()
    expect(de.length).toBe(3);
  });

  it('Should call unsubscribe on component destroy', () => {
    spyOn(component.loginStatusSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.loginStatusSubscription.unsubscribe).toHaveBeenCalledTimes(1);
  })

  xit('router navigate test', () => {
    let spy = spyOn(router, 'navigate');
    component.onLogout();
    // expect(spy).toHaveBeenCalledWith(['/auth/login'])
  });

  // it('router navigate test', () => {
  //   // let spy = spyOn(router, 'navigate');
  //   // component.onLogout();
  //   // expect(spy).toHaveBeenCalledWith(['/auth/Login'])

  //   // router.navigate(['/auth/login']);
  //   // expect(spy).toHaveBeenCalledOnceWith(['/auth/login'])
  //   // expect(spy).toHaveBeenCalledWith(['/auth/login']);

  //   const spy = router.navigateByUrl as jasmine.Spy;
  //   const navArgs = spy.calls.first().args[0];
  //   expect(navArgs).toBe('/auth/login');
  // })


});
