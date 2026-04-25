import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { Termsandconditions } from './termsandconditions/termsandconditions';
import { ShippingPolicy } from './shipping-policy/shipping-policy';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-and-conditions', component: Termsandconditions },
  { path: 'shipping-policy', component: ShippingPolicy },
  { path: '**', redirectTo: '' }
];
