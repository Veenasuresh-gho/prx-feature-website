import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPage, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prx-feature-website');
}
