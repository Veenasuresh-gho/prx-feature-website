import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { HealthcareEcosystem } from './healthcare-ecosystem/healthcare-ecosystem';
import { GetStarted } from './get-started/get-started';
import { TrustCarePreview } from './trust-care-preview/trust-care-preview';
import { SpecialityCare } from './speciality-care/speciality-care';
import { AppFeaturesPreview } from './app-features-preview/app-features-preview';
import { RegistrationForm } from './registration-form/registration-form';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, HealthcareEcosystem, GetStarted, TrustCarePreview, SpecialityCare, AppFeaturesPreview, RegistrationForm,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prx-feature-website');
}
