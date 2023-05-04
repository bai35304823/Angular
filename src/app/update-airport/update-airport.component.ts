import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airport } from '../model/airport.mode';
import { AirportService } from '../service/airport.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-airport',
  templateUrl: './update-airport.component.html',
  styleUrls: ['./update-airport.component.css']
})


export class UpdateAirportComponent implements OnInit {
  updateForm?: FormGroup;
  airport: Airport ;
  empIdFromRoute: number;
  Airports_l?: Airport[];////
  submitted = false;
  loading: boolean = false;
  errorMessage;
  constructor(private formBuilder: FormBuilder, private airportService: AirportService,private route: ActivatedRoute,private router:Router) {
    this.airportService = airportService;
   }
  ngOnInit(): void {
    const airportNamePattern = "^[ a-zA-Z0-9]*$$";
    const countryCodePattern = "^[a-zA-Z0-9]{1,5}";
    this.updateForm = this.formBuilder.group({
      id:[],
      airportCode: [],
      airportName: ['Changi Airport',[Validators.required,Validators.pattern(airportNamePattern)]],
      countryId: ['SG',[Validators.required,Validators.pattern(countryCodePattern)]]
    })

    const routeParams = this.route.snapshot.paramMap;
    this.empIdFromRoute = Number(routeParams.get('id'));

    //alert(routeParams);
    //alert(this.empIdFromRoute);
  // Find the Airport that correspond with the id provided in route.
  this.airportService.getAirport(this.empIdFromRoute).subscribe((data) => { 
    console.log(data);
    this.airport = data },
    (error: HttpErrorResponse) => {                              //Error callback
      console.error('error caught in component');
      console.error(error);
      this.errorMessage = error.error.message;
      if (!this.errorMessage) {
        // strValue was empty string, false, 0, null, undefined, ...
        this.errorMessage = error.error.text;
      }
      this.loading = false;

      throw error;
    });
  //alert(this.Airport);

  //alert(this.Airports_l[0]);
   
  }
  saveAirport() {
    this.submitted = true;
    if(this.updateForm.invalid){
      console.log("Invalid details, form data not submitted!");
      console.log( JSON.stringify(this.updateForm.value));
      return;
    }
    console.log(this.updateForm.value);
    //this.updateForm.controls['id'].setValue(this.empIdFromRoute);
    console.log("Airport details sent to server...");
    console.log(this.updateForm.value);

    console.log(this.airport);
  
    this.loading = true;
    this.errorMessage = "";
    this.airportService.updateAirport(this.empIdFromRoute, this.updateForm.value).subscribe((data) => {
      console.log('saved the data', data)
      this.airport = new Airport();
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
}
