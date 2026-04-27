import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface JoinFormData {
  facilityName: string;
  type: string;
  phoneCode: string;
  phone: string;
  email: string;
  contactPersonName: string;
}

@Component({
  selector: 'app-join-prx-modal',
  standalone: true, // ✅ REQUIRED
  imports: [CommonModule, FormsModule],
  templateUrl: './join-prx-modal.html',
  styleUrls: ['./join-prx-modal.css'], // ✅ FIXED
})
export class JoinPrxModal {

  @Output() submitted = new EventEmitter<JoinFormData>();
  @Output() cancelled = new EventEmitter<void>();

  facilityTypes = [
    'Doctor / General Practitioner',
    'Clinic',
    'Laboratory',
    'Pharmacy',
    'Specialist Hospital',
    'Diagnostic Centre',
    'Dental Clinic',
    'Eye Clinic',
    'Physiotherapy Centre',
    'Mental Health Centre',
  ];

  phoneCodes = [
    { code: '+1', flag: '🇺🇸', label: 'US' },
    { code: '+44', flag: '🇬🇧', label: 'UK' },
    { code: '+91', flag: '🇮🇳', label: 'IN' },
    { code: '+234', flag: '🇳🇬', label: 'NG' },
    { code: '+254', flag: '🇰🇪', label: 'KE' },
    { code: '+233', flag: '🇬🇭', label: 'GH' },
    { code: '+27', flag: '🇿🇦', label: 'ZA' },
    { code: '+971', flag: '🇦🇪', label: 'AE' },
  ];

  formData: JoinFormData = {
    facilityName: '',
    type: '',
    phoneCode: '',
    phone: '',
    email: '',
    contactPersonName: '',
  };

  submitted_flag = false;

  get selectedPhoneLabel(): string {
    if (!this.formData.phoneCode) return 'Select';
    const match = this.phoneCodes.find(p => p.code === this.formData.phoneCode);
    return match ? `${match.flag} ${match.code}` : 'Select';
  }

  onSubmit(): void {
    this.submitted_flag = true;

    if (this.isFormValid()) {
      this.submitted.emit({ ...this.formData });

      this.resetForm();
      this.cancelled.emit();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  isFormValid(): boolean {
    return (
      this.formData.facilityName.trim() !== '' &&
      this.formData.type !== '' &&
      this.formData.phoneCode !== '' &&
      this.formData.phone.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.contactPersonName.trim() !== ''
    );
  }

  isFieldInvalid(value: string): boolean {
    return this.submitted_flag && value.trim() === '';
  }

  isSelectInvalid(value: string): boolean {
    return this.submitted_flag && value === '';
  }

  // ✅ Bonus: reset form
  resetForm(): void {
    this.formData = {
      facilityName: '',
      type: '',
      phoneCode: '',
      phone: '',
      email: '',
      contactPersonName: '',
    };
    this.submitted_flag = false;
  }
}