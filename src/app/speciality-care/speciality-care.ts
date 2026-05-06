import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tags } from '../model/ghomodel';
import { GHOService } from '../services/ghoServices';


declare var google: any;

@Component({
  selector: 'speciality-care',
  templateUrl: './speciality-care.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./speciality-care.css'],
  encapsulation: ViewEncapsulation.None
})
export class SpecialityCare implements AfterViewInit, OnInit {
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: any) {
    if (!event.target.closest('.sf')) {
      this.showSuggestions = false;
      this.showDoctorSuggestions = false;
    }
  }
  @ViewChild('locationInput') locationInput!: ElementRef;
  searchText: string = '';
  facility: string = '';
  selectedLocation: any = {
    city: '',
    state: '',
    country: '',
    latitude: null,
    longitude: null
  };

  tv: tags[] = [];
  conditionList: any[] = [];
  doctorList: any[] = [];
  filteredDoctors: any[] = [];
  selectedDoctor: any = null;
  filteredConditions: any[] = [];
  showDoctorSuggestions = false;
  doctorSearchTimeout: any;
  showSuggestions = false;
  isLoadingDoctors = false;
  isLoadingConditions = false;
  selectedCondition: any = null;
  specialties: any[] = [];
  srv = inject(GHOService);

  getConditionList() {
    this.isLoadingConditions = true;

    this.tv = [{ T: 'c10', V: '10' }];

    this.srv.getdata('lists', this.tv).subscribe({
      next: (r) => {
        this.isLoadingConditions = false;

        if (r.Status === 1 && r.Data?.length > 0) {
          const rawList = r.Data[0];

          this.conditionList = rawList;
          this.filteredConditions = [...this.conditionList];

          this.specialties = this.conditionList.map((item: any) => {
            const tagList = item.Tags
              ? item.Tags.split(',').map((t: string) => t.trim())
              : [];

            return {
              id: item.SpecialtyID,
              name: item.SpecialtyName,
              title: item.Specialty,
              desc: item.BodyFunction || item.Condition || 'No description available',
              tags: tagList
            };
          });

          this.total = Math.ceil(this.specialties.length / this.PER_PAGE);
          this.renderDesktop();
          this.renderMobile();

        }
      },
      error: () => {
        this.isLoadingConditions = false;
      }
    });
  }

  goToSpeciality(s: any): void {
    const params = new URLSearchParams({
      tenantId: s.id,
      type: 'Speciality',
      name: s.name
    });

    window.location.href =
      `https://portal.prx.care/en/schedule-appointment?${params.toString()}`;
  }

  get isSearchEnabled(): boolean {
    return !!(this.selectedCondition || this.selectedDoctor);
  }

  getDoctorList() {
    if (!this.selectedLocation?.city) return;
    this.isLoadingDoctors = true;
    this.tv = [
      { T: 'dk1', V: this.facility },
      { T: 'dk2', V: this.selectedLocation?.city },
      { T: 'c10', V: '14' }
    ];

    this.srv.getdata('lists', this.tv).subscribe({
      next: (r) => {
        this.isLoadingDoctors = false;
        if (r.Status === 1 && r.Data?.length > 0) {
          this.doctorList = r.Data[0];
          this.filteredDoctors = this.doctorList;
          this.showDoctorSuggestions = true;
        } else {
          this.filteredDoctors = [];
          this.showDoctorSuggestions = false;
        }
      },
      error: () => {
        this.isLoadingDoctors = false;
        this.filteredDoctors = [];
        this.showDoctorSuggestions = false;
      }
    });
  }

  onDoctorFocus(): void {
    if (!this.doctorList.length) {
      this.getDoctorList();
    }

    this.filteredDoctors = [...this.doctorList];
    this.showDoctorSuggestions = true;
  }

  onDoctorInput(): void {
    const value = this.facility?.trim();

    if (!value) {
      this.filteredDoctors = [];
      this.showDoctorSuggestions = false;
      return;
    }

    clearTimeout(this.doctorSearchTimeout);

    this.doctorSearchTimeout = setTimeout(() => {
      this.getDoctorList();
    }, 400);
  }


  selectDoctor(doc: any): void {
    this.facility = doc.Name;
    this.selectedDoctor = doc;
    this.showDoctorSuggestions = false;

  }


  onConditionFocus(): void {
    if (!this.conditionList.length && !this.isLoadingConditions) {
      this.getConditionList();
    }


    this.filteredConditions = [...this.conditionList];
    this.showSuggestions = true;
  }

  onConditionInput(): void {
    const value = this.searchText?.toLowerCase() || '';

    this.filteredConditions = this.conditionList.filter((item: any) =>
      item.SpecialtyName?.toLowerCase().includes(value) ||
      item.BodyParts?.toLowerCase().includes(value) ||
      item.Condition?.toLowerCase().includes(value) ||
      item.BodyFunction?.toLowerCase().includes(value)
    );

    this.showSuggestions = true;
  }

  selectCondition(item: any): void {
    console.log(item)
    this.searchText = item.SpecialtyName;
    this.selectedCondition = item;
    this.showSuggestions = false;

  }


  PER_PAGE = 9;
  MOB_LIMIT = 5;
  page = 1;
  total = Math.ceil(this.specialties.length / this.PER_PAGE);

  ICON = '/deco-briefcase.svg';

  ngOnInit(): void {

    // ✅ FIXED GLOBAL FUNCTION
    (window as any).specialityClick = (id: number, name: string) => {
      const params = new URLSearchParams({
        tenantId: id.toString(),  
        type: 'Speciality',
        name: name                 // ✅ use name
      });

      window.location.href =
        `https://portal.prx.care/en/schedule-appointment?${params.toString()}`;
    };

    this.getConditionList();

    const stored = sessionStorage.getItem('userLocation');

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (parsed && parsed.city) {
          this.selectedLocation = parsed;
        }
      } catch (e) {
        console.error('Invalid stored location');
      }
    }
  }

  ngAfterViewInit(): void {
    this.renderDesktop();
    this.renderMobile();

    if (typeof google !== 'undefined') {
      this.initAutocomplete();
    }
  }

  initAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(
      this.locationInput.nativeElement,
      {
        types: []
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      let city = '';
      let sublocality = '';
      let district = '';
      let state = '';
      let country = '';

      place.address_components?.forEach((comp: any) => {

        if (comp.types.includes('sublocality') || comp.types.includes('sublocality_level_1')) {
          sublocality = comp.long_name;
        }

        if (comp.types.includes('locality')) {
          city = comp.long_name;
        }

        if (comp.types.includes('administrative_area_level_3')) {

          district = comp.long_name;
        }

        if (comp.types.includes('administrative_area_level_1')) {
          state = comp.long_name;
        }

        if (comp.types.includes('country')) {
          country = comp.long_name;
        }
      });

      if (!city) {
        city = district || place.name;
      }
      const finalCity = sublocality || city || district || place.name;

      this.selectedLocation = {
        city: finalCity,
        district,
        state,
        country,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      };

      console.log('Selected Location:', this.selectedLocation);

      sessionStorage.setItem('userLocation', JSON.stringify(this.selectedLocation));
    });
  }

  cardHTML(s: any): string {
    const safeName = encodeURIComponent(s.name);

    const tags = s.tags.map((t: string, i: number) =>
      `<span class="tag">${t}</span>${i < s.tags.length - 1 ? '<span class="tag-sep">•</span>' : ''}`
    ).join('');

    return `<article class="card" onclick="window.specialityClick(${s.id}, decodeURIComponent('${safeName}'))">
      <div class="card__ico">
        <img src="${this.ICON}" alt="icon">
      </div>
      <h3 class="card__title">${s.title}</h3>
      <p class="card__desc">${s.desc}</p>
      <div class="card__tags ">${tags}</div>
    </article>`;
  }


  renderDesktop(): void {
    const start = (this.page - 1) * this.PER_PAGE;
    const grid = document.getElementById('desktopGrid');
    if (!grid) return;

    grid.innerHTML = this.specialties
      .slice(start, start + this.PER_PAGE)
      .map(s => this.cardHTML(s))
      .join('');

    const pn = document.getElementById('pageNums');
    if (!pn) return;

    pn.innerHTML = '';

    for (let p = 1; p <= this.total; p++) {
      const btn = document.createElement('button');
      btn.className = 'pag__num' + (p === this.page ? ' active' : '');
      btn.textContent = p.toString();

      btn.onclick = () => {
        this.page = p;
        this.renderDesktop();
      };

      pn.appendChild(btn);
    }
  }



  renderMobile(): void {
    const mob = document.getElementById('mobileGrid');
    if (!mob) return;

    mob.innerHTML = this.specialties
      .slice(0, this.MOB_LIMIT)
      .map(s => this.cardHTML(s))
      .join('');
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.renderDesktop();
    }
  }

  nextPage(): void {
    if (this.page < this.total) {
      this.page++;
      this.renderDesktop();
    }
  }
  doSearch(): void {

    if (this.selectedCondition) {
      const params = new URLSearchParams({
        tenantId: this.selectedCondition.SpecialtyID,
        type: 'Speciality',
        name: this.selectedCondition.SpecialtyName
      });

      window.location.href =
        `https://portal.prx.care/en/schedule-appointment?${params.toString()}`;
      return;
    }

    // ✅ 2. If doctor selected
    if (this.selectedDoctor) {

      // 👉 Doctor profile
      if (this.selectedDoctor.Entity === 'Doctor') {
        window.location.href =
          `https://portal.prx.care/en/schedule-appointment/${this.selectedDoctor.Slug}`;
        return;
      }

      // 👉 Hospital page
      if (this.selectedDoctor.Entity === 'Hospital') {
        const params = new URLSearchParams({
          tenantId: this.selectedDoctor.ID,
          tenantIdAlt: this.selectedDoctor.ID
        });

        window.location.href =
          `https://portal.prx.care/en/hospital?${params.toString()}`;
        return;
      }
    }

    window.location.href =
      `https://portal.prx.care/en/schedule-appointment`;
  }
}