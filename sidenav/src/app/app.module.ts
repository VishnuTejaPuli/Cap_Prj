import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { NaturalDisastersComponent } from './natural-disasters/natural-disasters.component';
import { AccidentsComponent } from './accidents/accidents.component';
import { WomensafetyComponent } from './womensafety/womensafety.component';
import { ChildsafetyComponent } from './childsafety/childsafety.component';
import { HelplineComponent } from './helpline/helpline.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { WeatherComponent } from './weather/weather.component';
import { SosComponent } from './sos/sos.component';
import { FormsModule } from '@angular/forms';
import { NdFormComponent } from './nd-form/nd-form.component';
import { WAlertComponent } from './w-alert/w-alert.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { LiveMapComponent } from './live-map/live-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NaturalDisastersComponent,
    AccidentsComponent,
    WomensafetyComponent,
    ChildsafetyComponent,
    HelplineComponent,
    SidenavComponent,
    DashboardComponent,
    AboutComponent,
    WeatherComponent,
    SosComponent,
    NdFormComponent,
    WAlertComponent,
    MapComponent,
    LiveMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
