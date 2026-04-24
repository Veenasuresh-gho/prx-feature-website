import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: '**', redirectTo: '' }
];
