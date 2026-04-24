import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TocItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-prx-legal',
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PrivacyPolicy implements OnInit, OnDestroy {

  activeTab = 'privacy';
  activeSection = '';

  readonly tocs: Record<string, TocItem[]> = {
    privacy: [
      { id: 'pp-overview',  label: 'Overview' },
      { id: 'pp-collect',   label: '1. Information We Collect' },
      { id: 'pp-use',       label: '2. How We Use Your Data' },
      { id: 'pp-sharing',   label: '3. Data Sharing' },
      { id: 'pp-security',  label: '4. Data Security' },
      { id: 'pp-rights',    label: '5. Your Rights' },
      { id: 'pp-retention', label: '6. Data Retention' },
      { id: 'pp-children',  label: "7. Children's Privacy" },
      { id: 'pp-cookies',   label: '8. Cookies & Tracking' },
      { id: 'pp-transfers', label: '9. International Transfers' },
      { id: 'pp-changes',   label: '10. Policy Updates' },
      { id: 'pp-contact',   label: '11. Contact Us' },
    ],
    terms: [
      { id: 'tc-overview',     label: 'Overview' },
      { id: 'tc-eligibility',  label: '1. Eligibility' },
      { id: 'tc-platform',     label: '2. Platform Services' },
      { id: 'tc-accounts',     label: '3. User Accounts' },
      { id: 'tc-obligations',  label: '4. User Obligations' },
      { id: 'tc-medical',      label: '5. Medical Disclaimer' },
      { id: 'tc-appointments', label: '6. Appointments & Bookings' },
      { id: 'tc-payments',     label: '7. Payments & Refunds' },
      { id: 'tc-ip',           label: '8. Intellectual Property' },
      { id: 'tc-liability',    label: '9. Limitation of Liability' },
      { id: 'tc-termination',  label: '10. Account Termination' },
      { id: 'tc-governing',    label: '11. Governing Law' },
      { id: 'tc-contact',      label: '12. Contact Us' },
    ],
    shipping: [
      { id: 'sh-overview',       label: 'Overview' },
      { id: 'sh-coverage',       label: '1. Delivery Coverage' },
      { id: 'sh-timeline',       label: '2. Delivery Timeline' },
      { id: 'sh-processing',     label: '3. Order Processing' },
      { id: 'sh-charges',        label: '4. Shipping Charges' },
      { id: 'sh-tracking',       label: '5. Order Tracking' },
      { id: 'sh-returns',        label: '6. Returns & Refunds' },
      { id: 'sh-failed',         label: '7. Failed Deliveries' },
      { id: 'sh-prescription',   label: '8. Prescription Medicines' },
      { id: 'sh-responsibility', label: '9. Responsibility' },
      { id: 'sh-contact',        label: '10. Contact Us' },
    ],
  };

  get currentToc(): TocItem[] {
    return this.tocs[this.activeTab] ?? [];
  }

  ngOnInit(): void {
    // Set initial active section to first item
    const first = this.currentToc[0];
    if (first) {
      this.activeSection = first.id;
    }
  }

  ngOnDestroy(): void {}

  switchTab(tab: string): void {
    this.activeTab = tab;
    // Set active section to first item of new tab
    const first = this.tocs[tab]?.[0];
    this.activeSection = first ? first.id : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    // 57px tab nav height + 16px breathing room
    const offset = 73;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    this.activeSection = id;
  }

  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  isTocActive(id: string): boolean {
    return this.activeSection === id;
  }

  printPage(): void {
    window.print();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const items = this.currentToc;
    // Scan from bottom up — first section whose top is at/above the fold wins
    for (let i = items.length - 1; i >= 0; i--) {
      const el = document.getElementById(items[i].id);
      if (el && el.getBoundingClientRect().top <= 140) {
        if (this.activeSection !== items[i].id) {
          this.activeSection = items[i].id;
        }
        return;
      }
    }
    // If nothing is past the fold, highlight the first item
    if (items.length && this.activeSection !== items[0].id) {
      this.activeSection = items[0].id;
    }
  }
}