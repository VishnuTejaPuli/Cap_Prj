import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | null = null; // Initialize as null

  constructor() {}
 

  ngOnInit(): void {
    // Set the access token
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoicHVsaXZpc2hudSIsImEiOiJjbTBraHI5emwwcGR1MmtzYmpxdjNmcmhzIn0.C9Ux6xJRGcByvmLARfw9Rg';

    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLongitude = position.coords.longitude;
          const userLatitude = position.coords.latitude;

          // Initialize the map with user's location
          this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [userLongitude, userLatitude], // Center map on user's location
            zoom: 12 // Adjust zoom level as needed
          });
          new mapboxgl.Marker({ color: 'red' }) // Customize marker color if desired
          .setLngLat([userLongitude, userLatitude])
          .addTo(this.map);

        // Optional: Add popup to the marker
        const popup = new mapboxgl.Popup({ offset: 25 }).setText('You are here!');
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat([userLongitude, userLatitude])
          .setPopup(popup)
          .addTo(this.map);
        },
        (error) => {
          console.error('Error getting location: ', error);
          // Fallback coordinates if location access is denied
          this.initializeDefaultMap();
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.initializeDefaultMap(); // Fallback if Geolocation is not supported
    }

    // Resize the map on window resize
    window.addEventListener('resize', () => {
      if (this.map) {
        this.map.resize();
      }
    });
  }

  // Initialize map with default center if location access is denied
  initializeDefaultMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.9366, 8.5241], // Default to Trivandrum coordinates
      zoom: 10
    });
  }
}
