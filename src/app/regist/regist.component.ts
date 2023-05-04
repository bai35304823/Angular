import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegService } from '../service/reg.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {
  registerForm?: FormGroup;
  submitted = false;
  loading: boolean = false;
  errorMessage;
  constructor(private formBuilder: FormBuilder, private router : Router,  private regService: RegService) { }
  ngOnInit(): void {
    // const emailPattern = "";
    const phoneNumberPattern = "^((\\+65-?)|0)?[0-9]{10}$";
    const pwdPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_])(?!.* ).{8,16}$";
    const emailPattern = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    this.registerForm = this.formBuilder.group({
      adminName : ['Bruce Lee',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      email: ['bruce@lee.com',[Validators.required,Validators.pattern(emailPattern)]],
      phone: ['1212121212',[Validators.required,Validators.pattern(phoneNumberPattern)]],
      password:['',[Validators.required,Validators.pattern(pwdPattern)]]
    })
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.errorMessage = "";
    // if the form is valid, store it in the backend else cancel submission
    if(this.registerForm.invalid){
      console.log("Invalid details, form data not submitted!");
      console.log( JSON.stringify(this.registerForm.value));
      return;
    }
    console.log('Registered Successfully :-) ' + JSON.stringify(this.registerForm.value));
    this.regService.regAdmin(this.registerForm.value).subscribe( (data: HttpResponse<any>) => {
      if (data.status === 200 || data.status === 202) {
        console.log(`Got a successfull status code: ${data.status}`);
      }
      console.log(`This contains body: ${data.body}`);
      this.router.navigate(['login']);
    },
      (error: HttpErrorResponse) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error.error.message;
        this.loading = false;

        throw error;
      }
    )
    //this.router.navigate(['login']);
  }

  get rfc() {
    return this.registerForm.controls;
  }
}
