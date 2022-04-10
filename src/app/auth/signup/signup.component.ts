import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    })
    
  }

  onSignup() {
    console.log(this.signupForm.value);
    if(this.signupForm.invalid) return;
    this.authService.onCreateUser(this.signupForm.value).subscribe(res=> {
      if(res) {
        this.toastr.success("Accounta is created. Pleas log in.");
        this.router.navigate(['auth/login']);
        console.log('resssssssssssssss', res);
      }
    })
  }

}
