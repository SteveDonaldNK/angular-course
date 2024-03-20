import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" (input)="onChange($event)" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
      *ngFor="let housinglocation of filteredLocationList"
        [housinglocation]="housinglocation">
      </app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  filteredLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    })
  }

  onChange(event: any) {
    this.filterResults(event.target.value);
  }

  filterResults(city: string) {
    if (!city) {
      this.filteredLocationList = this.housingLocationList;
      return ;
    }

    this.filteredLocationList = this.housingLocationList.filter(housinglocation => housinglocation?.city.toLocaleLowerCase().includes(city.toLocaleLowerCase()));
  }
  
}
