import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent  // Declare the Map Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
    // LeafletModule 
     // Import LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
