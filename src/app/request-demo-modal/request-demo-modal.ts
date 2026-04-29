

import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GHOService } from '../services/ghoServices';
import { tags } from '../model/ghomodel';
import { ToastService } from '../services/toastService';

export interface JoinFormData {
  facilityName: string;
  type: string;
  CountryID: number | null;
  phone: string;
  email: string;
  contactPersonName: string;
}

@Component({
  selector: 'app-request-demo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-demo-modal.html',
  styleUrls: ['./request-demo-modal.css'],
})
export class RequestDemoModal implements OnInit {

  @Output() submitted = new EventEmitter<JoinFormData>();
  @Output() cancelled = new EventEmitter<void>();

  tv: tags[] = [];
  countryList: any;
  srv = inject(GHOService);
  toast = inject(ToastService);

  facilityTypes = [
    'Hospital',
    'Clinic',
    'Pharmacy',
    'Laboratory',
    'Dental Clinic',
    'Healthcare Provider',
    'Self Practitioner Doctor',
  ];

  formData: JoinFormData = {
    facilityName: '',
    type: '',
    CountryID: null,
    phone: '',
    email: '',
    contactPersonName: '',
  };

  get selectedCountry() {
    return this.countryList?.find(
      (c: any) => c.CountryID == this.formData.CountryID
    );
  }

  submitted_flag = false;

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry() {
    this.tv = [
      { T: 'c10', V: '99' }
    ];
    this.srv.getdata('lists', this.tv).subscribe((r) => {
      if (r.Status === 1 && r.Data?.length > 0) {
        this.countryList = r.Data[0];
      }
    });
  }

  onSubmit(): void {
    this.submitted_flag = true;

    if (this.isFormValid()) {
      this.submitted.emit({ ...this.formData });

      const payload = {
        TenantName: this.formData?.facilityName,
        Email: this.formData?.email,
        Phone: this.formData?.phone,
        CountryID: this.formData?.CountryID,
        TenantType: this.formData?.type,
        ContactPersonName: this.formData?.contactPersonName
      }

      this.tv = [
        { T: 'c1', V: JSON.stringify(payload) },
        { T: 'c10', V: '15' }
      ];
      this.srv.getdata('Tenants', this.tv).subscribe((r) => {
        if (r.Status === 0) {
          this.toast.showError(r.Info);
        }

        if (r.Status === 1) {
          this.toast.showSuccess(r.Data[0][0].Message);

          setTimeout(() => {
            this.resetForm();
            this.cancelled.emit();
          }, 500); 
        }
      });


    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  isFormValid(): boolean {
    return (
      this.formData.facilityName.trim() !== '' &&
      this.formData.type !== '' &&
      this.formData.CountryID !== null &&
      this.formData.phone.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.contactPersonName.trim() !== ''
    );
  }

  isFieldInvalid(value: string): boolean {
    return this.submitted_flag && value.trim() === '';
  }

  isSelectInvalid(value: any): boolean {
    return this.submitted_flag && (value === null || value === '');
  }

  resetForm(): void {
    this.formData = {
      facilityName: '',
      type: '',
      CountryID: null,
      phone: '',
      email: '',
      contactPersonName: '',
    };
    this.submitted_flag = false;
  }
}