import { Component, OnInit } from '@angular/core';
import { AirportService } from '../service/airport.service';
import { Router } from '@angular/router';
import { Airport } from '../model/airport.mode';

@Component({
  selector: 'app-list-airport',
  templateUrl: './list-airport.component.html',
  styleUrls: ['./list-airport.component.css']
})


export class ListAirportComponent implements OnInit {
  Airports?: Airport[];
  air: Airport[] = [];
  term = '';
  searchText;
  AirportService: AirportService
  constructor(AirportService: AirportService, private router: Router) {
    this.AirportService = AirportService;
    // dependency inject the router to navigate dynamically through code

  }

  ngOnInit(): void {
    // Consume the Airport Service
    // the special symbol game {{}} [] () ? ! * @ =>
    this.AirportService.getAirports().subscribe((AirportData) => { 
       console.log(AirportData);
      
      this.Airports = AirportData });
    // function test(AirportData) {
    //   this.Airports = AirportData;
    // }

    // (AirportData) =>   {this.Airports = AirportData}
    // AirportData =>   this.Airports = AirportData

    console.log("Airports: " + this.Airports);
  }

  //search(value: string): void {
    //this.air = this.Airports.filter((val) =>
      //val.id.includes(value)
    //);
  //}
  //other operations to be implemented create, update, delete
  deleteAirport(toDeleteAirport: Airport): void {
    //alert(JSON.stringify(toDeleteAirport));
    this.AirportService.deleteAirport(toDeleteAirport.id).subscribe((deletedAirport) => {
      //alert(JSON.stringify(deletedAirport))} );
      // sync the Airport with the in-memory array
      this.Airports = this.Airports.filter(deletedAirport => deletedAirport != toDeleteAirport);
    })
  }
}
