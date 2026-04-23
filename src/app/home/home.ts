import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

  isMenuOpen = false;

  toggleMobile() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    const clickedInside = event.target.closest('.navbar');
    if (!clickedInside) {
      this.closeMenu();
    }
  }
}