import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPrxModal } from '../join-prx-modal/join-prx-modal';
import { RequestDemoModal } from '../request-demo-modal/request-demo-modal';
import { GeolocationService } from '../services/geolocationService';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, JoinPrxModal, RequestDemoModal],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

    constructor(private geo: GeolocationService) { }

    isMenuOpen = false;
    isJoinModalOpen = false;
    isRequestDemoModalOpen = false;

    activeDropdown: string | null = null;
    activeMobileDropdown: string | null = null;

    location: any = null;

    ngOnInit(): void {
        this.getLocation();
    }

    async getLocation(): Promise<void> {
        try {
            this.location = await this.geo.getFullLocation();

            sessionStorage.setItem(
                'userLocation',
                JSON.stringify(this.location)
            );
        } catch (err) {
            console.error(err);
        }
    }

    // Desktop Dropdown

    toggleDropdown(menu: string, event: Event): void {
        event.stopPropagation();

        this.activeDropdown =
            this.activeDropdown === menu ? null : menu;
    }

    // Mobile Menu

    toggleMobile(event: Event): void {
        event.stopPropagation();

        this.isMenuOpen = !this.isMenuOpen;
        this.activeDropdown = null;

        if (!this.isMenuOpen) {
            this.activeMobileDropdown = null;
        }
    }

    // Mobile Accordion

    toggleMobileDropdown(menu: string): void {
        this.activeMobileDropdown =
            this.activeMobileDropdown === menu ? null : menu;
    }

    closeMobileMenu(): void {
        this.isMenuOpen = false;
        this.activeMobileDropdown = null;
    }

    // Join Network Modal

    openJoinModal(event: Event): void {
        event.stopPropagation();

        this.activeDropdown = null;
        this.isJoinModalOpen = true;
    }

    closeJoinModal(): void {
        this.isJoinModalOpen = false;
    }

    // Request Demo Modal

    openRequestDemoModal(event: Event): void {
        event.stopPropagation();

        this.activeDropdown = null;
        this.isRequestDemoModalOpen = true;
    }

    closeRequestDemoModal(): void {
        this.isRequestDemoModalOpen = false;
    }

    // Close Navigation

    closeAll(): void {
        this.isMenuOpen = false;
        this.activeDropdown = null;
        this.activeMobileDropdown = null;
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {
        const target = event.target;

        if (target instanceof Element && !target.closest('.navbar')) {
            this.closeAll();
        }
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        this.closeAll();
    }
}