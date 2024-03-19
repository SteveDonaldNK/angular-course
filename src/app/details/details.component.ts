import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,],
  template: `
  <article>
    <img class="listing-photo" [src]="housinglocation?.photo"
      alt="Exterior photo of {{housinglocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housinglocation?.name}}</h2>
      <p class="listing-location">{{housinglocation?.city}}, {{housinglocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housinglocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housinglocation?.wifi}}</li>
        <li>Does this location have laundry: {{housinglocation?.laundry}}</li>
      </ul>
    </section>
  </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService)
  housinglocationId = -1;
  housinglocation: Housinglocation | undefined;

  constructor() {
    this.housinglocationId = Number(this.route.snapshot.params['id']);
    this.housinglocation = this.housingService.getHousingLocationById(this.housinglocationId)
  }

}
