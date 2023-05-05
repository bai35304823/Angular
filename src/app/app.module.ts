import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListEmpComponent } from './list-emp/list-emp.component';
import { LoginComponent } from './login/login.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { RegisterComponent } from './register/register.component';
import { AddAirportComponent } from './add-airport/add-airport.component';
import { AirComponent } from './air/air.component';
import { ListAirportComponent } from './list-airport/list-airport.component';
import { UpdateAirportComponent } from './update-airport/update-airport.component';
import { RegistComponent } from './regist/regist.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FormsModule } from '@angular/forms';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [	
    AppComponent,
    ListEmpComponent,
    LoginComponent,
    AddEmpComponent,
    RegisterComponent,
    AddAirportComponent,
    AirComponent,
    ListAirportComponent,
    UpdateAirportComponent,
    RegistComponent,

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
