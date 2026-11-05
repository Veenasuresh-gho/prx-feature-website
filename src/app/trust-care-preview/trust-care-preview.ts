import { Component, inject } from '@angular/core';
import { CountryService } from '../services/country-service';

@Component({
  selector: 'trust-care-preview',
  imports: [],
  templateUrl: './trust-care-preview.html',
  styleUrl: './trust-care-preview.css',
})
export class TrustCarePreview {

   countryService = inject(CountryService);
}
