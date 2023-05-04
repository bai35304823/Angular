import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Airport } from "../model/airport.mode";


@Injectable({
    providedIn: 'root'
})
export class AirportService {
    baseUrl: string = "http://localhost:8888/api/v2/airport";
    constructor(private httpClient: HttpClient) {
    }
    getAirports() {
        //get
        return this.httpClient.get<Airport[]>(this.baseUrl+"/getAll");
    }

    createAirport(airport: Airport) {
        //post
        return this.httpClient.post(this.baseUrl+"/addOne", airport);
    }
    updateAirport(id: number, Airport: any): Observable<Object> {
        //put
        return this.httpClient.put<Airport[]>(this.baseUrl + "/updateById/" + id, Airport);
    }
    deleteAirport(id: number) {
        // //alert(id);
        //alert(this.baseUrl+"/"+id);
        //delete
        return this.httpClient.delete<Airport>(this.baseUrl + "/" + id);
    }

    getAirport(id: number) {
        // //alert(id);
        //alert(this.baseUrl+"/"+id);
        //delete
        return this.httpClient.get<Airport>(this.baseUrl + "/getById/" + id);
    }
}