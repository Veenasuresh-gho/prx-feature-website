import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'registration-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.html',
  styleUrls: ['./registration-form.css'],
})
export class RegistrationForm {

  form: FormGroup;
  submitted = false;
  loading = false;
  success = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      facilityName: ['', [Validators.required, Validators.minLength(2)]],
      contactPerson: ['', Validators.required],
      facilityType: ['', Validators.required],
      phoneNum: ['', [Validators.required, Validators.pattern(/^\d{6,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.form.reset();
      this.submitted = false;
    }, 1400);
  }

  resetForm() {
    this.success = false;
    this.form.reset();
    this.submitted = false;
  }
}