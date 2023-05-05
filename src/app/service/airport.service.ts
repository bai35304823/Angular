import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Airport } from "../model/airport.mode";


@Injectable({
    providedIn: 'root'
})
export class AirportService {
    baseUrl: string = "http://localhost:9302/api/v2/airport";
    h;
    constructor(private httpClient: HttpClient) {
        this.h = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')});
    }



    getAirports() {
        const h = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')});
        //get
        return this.httpClient.get<Airport[]>(this.baseUrl+"/getAll", {headers: h});
    }

    createAirport(airport: Airport) {
        //post
        return this.httpClient.post(this.baseUrl+"/addOne", airport, {headers: this.h});
    }
    updateAirport(id: number, Airport: any): Observable<Object> {
        //put
        return this.httpClient.put<Airport[]>(this.baseUrl + "/updateById/" + id, Airport, {headers: this.h});
    }
    deleteAirport(id: number) {
        // //alert(id);
        //alert(this.baseUrl+"/"+id);
        //delete
        return this.httpClient.delete<Airport>(this.baseUrl + "/" + id, {headers: this.h});
    }

    getAirport(id: number) {
        // //alert(id);
        //alert(this.baseUrl+"/"+id);
        //delete
        return this.httpClient.get<Airport>(this.baseUrl + "/getById/" + id, {headers: this.h});
    }
}