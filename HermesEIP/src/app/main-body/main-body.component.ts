import { Component } from '@angular/core';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent {

  sendSos() {
    // Logic to send emergency message to the police
    alert('SOS sent to police!');
  }
}
