import { Component } from '@angular/core';
import { Home } from '../home/home';
import { HealthcareEcosystem } from '../healthcare-ecosystem/healthcare-ecosystem';
import { GetStarted } from '../get-started/get-started';
import { TrustCarePreview } from '../trust-care-preview/trust-care-preview';
import { SpecialityCare } from '../speciality-care/speciality-care';
import { AppFeaturesPreview } from '../app-features-preview/app-features-preview';
import { RegistrationForm } from '../registration-form/registration-form'; 

@Component({
  selector: 'app-landing-page',
  standalone:true,
  imports: [Home, HealthcareEcosystem, GetStarted, TrustCarePreview, SpecialityCare, AppFeaturesPreview, RegistrationForm],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage { }
