import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.css']
})
export class LiveMapComponent implements OnInit {
  map!: L.Map;

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    // Initialize map and set view to user's current location
    this.map = L.map('map').locate({ setView: true, maxZoom: 16 });

    // Load and display tile layers on the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Add marker to the user's location
    this.map.on('locationfound', (e: L.LocationEvent) => {
      const radius = e.accuracy;
      L.marker(e.latlng).addTo(this.map)
        .bindPopup('You are within ' + radius + ' meters from this point').openPopup();
      L.circle(e.latlng, radius).addTo(this.map);
    });

    // Handle location error
    this.map.on('locationerror', (e: L.ErrorEvent) => {
      alert(e.message);
    });
  }
}
