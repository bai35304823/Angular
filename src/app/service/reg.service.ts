import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reg } from "../model/reg.model";

@Injectable({
  providedIn: 'root'
})
export class RegService {
  baseUrl: string = "http://localhost:9302/api/v2/registrations/register";
  loginUrl: string = "http://localhost:9302/api/v2/registrations/login";
  loginUrl2: string = "http://localhost:9302/api/v2/registrations";
  loginUrl3: string = "http://localhost:9302/authenticate";
  constructor(private httpClient: HttpClient) { }

  regAdmin(reg: Reg) {
    //post
    return this.httpClient.post(this.baseUrl, reg);
}
authAdmin(email: String, pwd: String) {
  //post
  const params = {'loginid': email,'password':pwd}
 /// let headers = new HttpHeaders();
//headers = headers.set('Content-Type', 'application/json; charset=utf-8');
 // return this.httpClient.post(this.loginUrl ,{'loginid': email,'password':pwd});
 return this.httpClient.get(this.loginUrl2+"/"+email+"/"+pwd);
}


authenticate(email: String, pwd: String) {
  //post
  const params = {'loginid': email,'password':pwd}
 /// let headers = new HttpHeaders();
//headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  return this.httpClient.post(this.loginUrl3 ,{'loginid': email,'password':pwd});
 //return this.httpClient.post(this.loginUrl3+"/",  params?: HttpParams |{'loginid': email,'password':pwd};);
}

}
