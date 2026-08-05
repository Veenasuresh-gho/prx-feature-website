import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { tags } from '../model/ghomodel';
import { GHOService } from '../services/ghoServices';
import { ToastService } from '../services/toastService';

@Component({
  selector: 'registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration-form.html',
  styleUrls: ['./registration-form.css'],
})
export class RegistrationForm implements OnInit {
  tv: tags[] = [];
  countryList: any[] = [];
  facilityTypeList: any[] = [];
  srv = inject(GHOService);
  toast = inject(ToastService);

  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      facilityName: ['', [Validators.required, Validators.minLength(2)]],
      contactPerson: ['', Validators.required],
      facilityType: [null, Validators.required],
      CountryID: [null, Validators.required],
      phoneNum: ['', [Validators.required, Validators.pattern(/^\d{6,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getCountry();
    this.getfacilityTypeList();
  }

  getCountry() {
    this.tv = [{ T: 'c10', V: '99' }];
    this.srv.getdata('lists', this.tv).subscribe((r) => {
      if (r.Status === 1 && r.Data?.length > 0) {
        this.countryList = r.Data[0];
      }
    });
  }

  getfacilityTypeList() {
    this.tv = [
      { T: 'dk1', V: 'TENANTTYPEID' },
      { T: 'c10', V: '5' }
    ];
    this.srv.getdata('lists', this.tv).subscribe((r) => {
      if (r.Status === 1 && r.Data?.length > 0) {
        this.facilityTypeList = r.Data[0];
        console.log(this.getfacilityTypeList)
      }
    });
  }

  submitForm() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      TenantName: this.form.value.facilityName,
      ContactPersonName: this.form.value.contactPerson,
      TenantType: this.form.value.facilityType,
      CountryID: this.form.value.CountryID,
      Phone: this.form.value.phoneNum,
      Email: this.form.value.email,
    };

    this.tv = [
      { T: 'c1', V: JSON.stringify(payload) },
      { T: 'c10', V: '14' },
    ];

    this.loading = true;

    this.srv.getdata('Tenants', this.tv).subscribe((r) => {
      this.loading = false;

      if (r.Status === 1) {
        this.toast.showSuccess(r.Data[0][0].Message);
        this.resetForm();
      } else {
        this.toast.showError(r.Info);
      }
    });
  }

  resetForm() {
    this.form.reset({
      facilityName: '',
      contactPerson: '',
      facilityType: null,
      CountryID: null,
      phoneNum: '',
      email: '',
    });
    this.submitted = false;
  }
}