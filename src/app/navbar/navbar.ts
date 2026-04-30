import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPrxModal } from '../join-prx-modal/join-prx-modal';
import { RequestDemoModal } from '../request-demo-modal/request-demo-modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, JoinPrxModal, RequestDemoModal],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isMenuOpen = false;
  isJoinModalOpen = false;
  isRequestDemoModalOpen = false;
  activeDropdown: string | null = null;

  toggleMobile(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(menu: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown =
      this.activeDropdown === menu ? null : menu;
  }

  openJoinModal(event: Event) {
    event.stopPropagation();
    this.activeDropdown = null;
    this.isJoinModalOpen = true;
  }

  openRequestDemoModal(event: Event) {
     event.stopPropagation();
    this.activeDropdown = null;
    this.isRequestDemoModalOpen = true;
  }

  closeRequestDemoModal(): void {
    this.isRequestDemoModalOpen = false;
  }

  closeJoinModal() {
    this.isJoinModalOpen = false;
  }

  closeAll() {
    this.isMenuOpen = false;
    this.activeDropdown = null;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    const clickedInside = event.target.closest('.navbar');
    if (!clickedInside) {
      this.closeAll();
    }
  }
}