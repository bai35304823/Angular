import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AirportService } from '../service/airport.service';
import { Router } from '@angular/router';
import { Airport } from '../model/airport.mode';
import { Observable } from 'rxjs/internal/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})


export class AddAirportComponent implements OnInit {
  addForm?: FormGroup;
  airports?: Observable<Airport[]>;
  loading: boolean = false;
  submitted = false;
  errorMessage;
  constructor(private formBuilder: FormBuilder, private airportService: AirportService,private router:Router) { }
  ngOnInit(): void {
    const airportNamePattern = "^[ a-zA-Z0-9]*$$";
    const countryCodePattern = "^[a-zA-Z0-9]{1,5}";
    this.addForm = this.formBuilder.group({
      id:[0],
      airportCode: [''],
      airportName: ['Changi Airport',[Validators.required,Validators.pattern(airportNamePattern)]],
      countryId: ['SG',[Validators.required,Validators.pattern(countryCodePattern)]]
    })
  }
  saveAirport() {
    this.submitted = true;
    if(this.addForm.invalid){
      console.log("Invalid details, form data not submitted!");
      console.log( JSON.stringify(this.addForm.value));
      return;
    }
    console.log("airport details sent to server...");
    console.log(this.addForm.value);
    this.loading = true;
    
    this.errorMessage = "";
    this.airportService.createAirport(this.addForm.value).subscribe((data) => {
      console.log('saved the data', data);
      this.reloadData();
      this.router.navigate(['/airports']);
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
    })
   
  }

  reloadData() {
    this.airports = this.airportService. getAirports();
  }
}


