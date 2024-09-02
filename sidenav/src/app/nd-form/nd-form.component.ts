import { Component } from '@angular/core';

@Component({
  selector: 'app-nd-form',
  templateUrl: './nd-form.component.html',
  styleUrls: ['./nd-form.component.css']
})
export class NdFormComponent {
  incident = {
    name: '',
    phone: '',
    description: ''
  };

  submitIncident() {
    console.log('Incident submitted', this.incident);
    // Handle form submission logic
  }

}
