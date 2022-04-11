import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private subjectService: SubjectsService
  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onLogin() {
    if(this.loginForm.invalid) return;
    this.authService.onLoginUser(this.loginForm.value).subscribe(res=> {
      if(res) {
        localStorage.setItem('token', res.token);
        this.subjectService.setUserLoginStatus(true);
        this.toastr.success("You are loged in.");
        this.router.navigate(['/products/list']);
      }
    })
  }

}
