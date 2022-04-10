import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SubjectsService } from '../services/subjects.service';


// interface for canDeactivate Guard implimentation
export interface IDeactivateGuard {
  canExit: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedinUser: boolean = false;

  constructor(
    private subjectsService: SubjectsService,
    private router: Router
  ) {
    this.subjectsService.isLoggedInBehaviourSub.subscribe(loginStatus => {
      this.isLoggedinUser = loginStatus;
    })
    if (localStorage.getItem('user')) {
      this.isLoggedinUser = true;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedinUser) {
      return true;
    } else {
      this.router.navigate(['/auth/login'])
      return false;
    }
  }

  canDeactivate(
    component: IDeactivateGuard,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canExit();
  }

}
