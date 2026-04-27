import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  JoinPrxModal } from '../join-prx-modal/join-prx-modal';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule,JoinPrxModal],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

   isJoinModalOpen = false;

  openJoinModal(): void {
    this.isJoinModalOpen = true;
  }

  closeJoinModal(): void {
    this.isJoinModalOpen = false;
  }

   
}