import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPrxModal } from '../join-prx-modal/join-prx-modal';
import { RequestDemoModal } from '../request-demo-modal/request-demo-modal';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, JoinPrxModal, RequestDemoModal],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

  isJoinModalOpen = false;
  isRequestDemoModalOpen = false;

  openRequestDemoModal(): void {
    this.isRequestDemoModalOpen = true;
  }

  closeRequestDemoModal(): void {
    this.isRequestDemoModalOpen = false;
  }

  openJoinModal(): void {
    this.isJoinModalOpen = true;
  }

  closeJoinModal(): void {
    this.isJoinModalOpen = false;
  }


}