import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toastService';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  email = '';
  loading = false;

  private toast = inject(ToastService);

  async handleSubscribe() {
    if (!this.email || !this.email.trim()) {
      this.toast.showError(
        'Please enter a valid email.',
        'Error'
      );
      return;
    }

    this.loading = true;

    try {
      // TODO: Replace with newsletter API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.toast.showSuccess(
        'Successfully subscribed!',
        'Success'
      );

      this.email = '';
    } catch (error) {
      this.toast.showError(
        'Failed to subscribe. Please try again.',
        'Error'
      );
    } finally {
      this.loading = false;
    }
  }
}