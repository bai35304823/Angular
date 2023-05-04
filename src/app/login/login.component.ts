import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegService } from '../service/reg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;
  submitted = false;
  loading: boolean = false;
  errorMessage;
  constructor(private formBuilder: FormBuilder, private router:Router,  private regService: RegService) { }


  onSubmit(): void {
    this.submitted = true;
      // if the form is valid, store it in the backend else cancel submission
      if(this.loginForm.invalid){
      console.log("Invalid details, form data not submitted!");
      console.log( JSON.stringify(this.loginForm.value));
      return;
    }
    console.log("logging .......");
    console.log(this.loginForm.value);
    const loginid: string = this.loginForm.controls['loginid'].value;
    const password: string = this.loginForm.controls['password'].value;
  
    this.loading = true;
    this.errorMessage = "";
    // use the authentication service, which in turn accesses the RESTAPI exposed by the LoginMicroservice.
    this.regService.authAdmin(loginid, password).subscribe( (data) => {
      if (data) {
        console.log(`Got a successfull status code: ${data}`);
        //console.log("00");
        console.log("00");
      }
      sessionStorage.setItem("loggedIn",'yes');
      console.log(`This contains body: ${data}`);
      this.router.navigate(['airports']);

    },
      (error: HttpErrorResponse) => {                              //Error callback
        console.error('error caught in component');
        this.errorMessage = error.error.message;
        if (!this.errorMessage) {
          // strValue was empty string, false, 0, null, undefined, ...
          this.errorMessage = error.error.text;
        }
        this.loading = false;

        throw error;
      }
    )
  }

  ngOnInit(): void {
    const emailPattern = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    this.loginForm = this.formBuilder.group({
      loginid: ['bruce@lee.com',[Validators.required,Validators.pattern(emailPattern)]],
      password: [,Validators.required]
    });
  }

  get rfc() {
    return this.loginForm.controls;
  }
}
