import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPage, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prx-feature-website');

  constructor(private router: Router) {
    this.trackPageViews();
  }

  trackPageViews() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-S2JG795FH1', {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }
}