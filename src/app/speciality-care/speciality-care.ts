import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'speciality-care',
  templateUrl: './speciality-care.html',
  styleUrls: ['./speciality-care.css'],
  encapsulation: ViewEncapsulation.None
})
export class SpecialityCare implements AfterViewInit {

  specialties = [
    { title: 'Dermatology (Skin Doctor)', desc: 'Treatment for skin, hair, and nail problems', tags: ['Skin issues', 'Hair fall', 'Acne'] },
    { title: 'Cardiology (Heart Specialist)', desc: 'Care for heart problems and blood pressure', tags: ['Heart disease', 'BP', 'Chest pain'] },
    { title: 'Orthopedic (Bone Specialist)', desc: 'Treatment for bones, joints, and injuries', tags: ['Back pain', 'Joint pain', 'Fractures'] },
    { title: 'Neurology (Brain & Nerve Specialist)', desc: 'Care for brain, spine, and nerve disorders', tags: ['Headache', 'Stroke', 'Nerve pain'] },
    { title: 'Pediatrics (Child Specialist)', desc: 'Healthcare for babies, kids, and teens', tags: ['Fever', 'Growth', 'Vaccination'] },
    { title: "Gynecology (Women's Health Specialist)", desc: "Care for women's health and pregnancy", tags: ['Periods', 'Pregnancy', 'PCOS'] },
    { title: 'Psychiatry (Mental Health Doctor)', desc: 'Support for mental and emotional health', tags: ['Anxiety', 'Depression', 'Stress'] },
    { title: 'Gastroenterology (Stomach Specialist)', desc: 'Care for digestive and stomach issues', tags: ['Acidity', 'Ulcer', 'Digestion'] },
    { title: 'Pulmonology (Lung Specialist)', desc: 'Core for breathing and lung conditions', tags: ['Asthma', 'Cough', 'Breathing issues'] },
    { title: 'Nephrology (Kidney Specialist)', desc: 'Treatment for kidney and fluid problems', tags: ['Kidney stones', 'Dialysis', 'Swelling'] },
    { title: 'Oncology (Cancer Specialist)', desc: 'Diagnosis and treatment of various cancers', tags: ['Tumors', 'Chemotherapy', 'Screening'] },
    { title: 'Ophthalmology (Eye Specialist)', desc: 'Care for vision and eye conditions', tags: ['Cataract', 'Glaucoma', 'Vision loss'] },
    { title: 'ENT (Ear, Nose & Throat)', desc: 'Treatment for ear, nose and throat disorders', tags: ['Ear pain', 'Sinusitis', 'Tonsils'] },
    { title: 'Endocrinology (Hormone Specialist)', desc: 'Care for hormonal and metabolic disorders', tags: ['Diabetes', 'Thyroid', 'Hormones'] },
    { title: 'Urology (Kidney & Urinary)', desc: 'Treatment for urinary tract and kidneys', tags: ['UTI', 'Kidney stones', 'Prostate'] },
    { title: 'Rheumatology (Joint Specialist)', desc: 'Care for arthritis and autoimmune conditions', tags: ['Arthritis', 'Lupus', 'Gout'] },
    { title: 'Hematology (Blood Specialist)', desc: 'Treatment for blood disorders and conditions', tags: ['Anemia', 'Blood clots', 'Leukemia'] },
    { title: 'Dentistry (Dental Specialist)', desc: 'Complete dental care and oral health', tags: ['Cavities', 'Root canal', 'Braces'] },
  ];

  PER_PAGE = 9;
  MOB_LIMIT = 5;
  page = 1;
  total = Math.ceil(this.specialties.length / this.PER_PAGE);

  ICON = '/deco-briefcase.svg';

  ngAfterViewInit() {
    this.renderDesktop();
    this.renderMobile();
  }

  cardHTML(s: any) {
    const tags = s.tags.map((t: string, i: number) =>
      `<span class="tag">${t}</span>${i < s.tags.length - 1 ? '<span class="tag-sep">•</span>' : ''}`
    ).join('');

    return `<article class="card">
      <div class="card__ico">
        <img src="${this.ICON}" alt="icon">
      </div>
      <h3 class="card__title">${s.title}</h3>
      <p class="card__desc">${s.desc}</p>
      <div class="card__tags">${tags}</div>
    </article>`;
  }

  renderDesktop() {
    const start = (this.page - 1) * this.PER_PAGE;

    const grid = document.getElementById('desktopGrid');
    if (!grid) return;

    grid.innerHTML = this.specialties
      .slice(start, start + this.PER_PAGE)
      .map(s => this.cardHTML(s))
      .join('');

    // ✅ Pagination numbers
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

      if (p === this.page) {
        btn.setAttribute('aria-current', 'page');
      }

      pn.appendChild(btn);
    }

    // arrows
    const prev = document.getElementById('prevBtn') as HTMLButtonElement;
    const next = document.getElementById('nextBtn') as HTMLButtonElement;

    if (prev) prev.disabled = this.page === 1;
    if (next) next.disabled = this.page === this.total;
  }

  renderMobile() {
    const mob = document.getElementById('mobileGrid');
    if (!mob) return;

    mob.innerHTML =
      this.specialties.slice(0, this.MOB_LIMIT).map(s => this.cardHTML(s)).join('');
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.renderDesktop();
    }
  }

  nextPage() {
    if (this.page < this.total) {
      this.page++;
      this.renderDesktop();
    }
  }

  doSearch() {
    console.log('search triggered');
  }
}