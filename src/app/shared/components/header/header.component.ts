import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/components/products/services/product.service';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  loginStatusSubscription: Subscription;
  isTaskTriggered = false;
  isTaskCompleted = false;

  constructor(
    private router: Router,
    private subjectService: SubjectsService,
    private productService: ProductService,
    ) { 
      this.loginStatusSubscription = this.subjectService.isLoggedInBehaviourSub.subscribe(loginStatus=> {
        this.isUserLoggedIn = loginStatus;
      })
    }

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      this.isUserLoggedIn = true;
    }
  }

  onLogout() {
    localStorage.clear();
    this.isUserLoggedIn = false;
    this.subjectService.setUserLoginStatus(false);
    this.router.navigateByUrl('/auth/login');
  }

  onTriggerTask(){
    this.isTaskTriggered = true;
    this.isTaskCompleted = false;
    this.productService.triggerTask().subscribe(res=> {
      if(res) {
        this.isTaskCompleted = true;
        this.isTaskTriggered = false;
      }
    })
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
