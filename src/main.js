import './style.css'
import translations from './translations.json'

let currentLang = 'es';

const elementsToTranslate = [
  'nav_home', 'nav_about', 'nav_education', 'nav_experience', 'nav_skills', 'nav_certifications',
  'hero_title', 'hero_phrase',
  'about_title', 'about_text',
  'edu_title', 'edu_1_title', 'edu_1_details', 'edu_2_title', 'edu_2_details', 'edu_3_title', 'edu_3_details',
  'exp_title', 'exp_rest_title', 'exp_rest_desc', 'exp_log_title', 'exp_log_desc', 'exp_event_title', 'exp_event_desc',
  'lang_title', 'lang_ar', 'lang_fr', 'lang_es', 'lang_en',
  'skills_title', 'skills_tech', 'skills_pers',
  'skills_tech_1', 'skills_tech_2', 'skills_tech_3', 'skills_tech_4',
  'skills_pers_1', 'skills_pers_2', 'skills_pers_3', 'skills_pers_4',
  'cert_title', 'cert_1', 'cert_2', 'obj_title', 'obj_text',
  'cv_btn', 'footer_contact', 'footer_links', 'footer_location'
];

function updateLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  elementsToTranslate.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = translations[lang][id];
    }
  });

  // Update footer links (they use data-id instead of tag IDs to avoid duplicates)
  document.querySelectorAll('.footer-link').forEach(link => {
    const id = link.dataset.id;
    if (translations[lang][id]) {
      link.textContent = translations[lang][id];
    }
  });

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update section title data-text for the background effect
  document.querySelectorAll('.section-title').forEach(title => {
    title.setAttribute('data-text', title.textContent);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initial Language
  updateLanguage('es');

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Event listeners for language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
  });

  // Image Slider
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  setInterval(nextSlide, 5000);

  // Scroll Reveal Observer
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.15
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Magnetic Navbar Effect (Subtle)
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.style.top = '1rem';
      nav.style.background = 'rgba(15, 18, 21, 0.9)';
    } else {
      nav.style.top = '1.5rem';
      nav.style.background = 'rgba(15, 18, 21, 0.6)';
    }
  });
});

document.querySelector('#app').innerHTML = `
  <nav>
    <div class="nav-logo-container">
      <img src="/Gemini_Generated_Image_c3wzwzc3wzwzc3wz.png" alt="Yassine El Khamlichi" class="nav-logo-img">
    </div>
    <div class="nav-links">
      <a href="#home" id="nav_home"></a>
      <a href="#about" id="nav_about"></a>
      <a href="#education" id="nav_education"></a>
      <a href="#experience" id="nav_experience"></a>
      <a href="#skills" id="nav_skills"></a>
      <a href="#certifications" id="nav_certifications"></a>
    </div>
    <div class="lang-selector">
      <button class="lang-btn" data-lang="es">ES</button>
      <button class="lang-btn" data-lang="en">EN</button>
      <button class="lang-btn" data-lang="fr">FR</button>
      <button class="lang-btn" data-lang="ar">AR</button>
    </div>
    <button id="theme-toggle" class="theme-toggle">
      <span class="moon-icon">🌙</span>
      <span class="sun-icon">☀️</span>
    </button>
  </nav>

  <main>
    <section id="home" class="hero">
      <div class="profile-container reveal">
        <img src="/Gemini_Generated_Image_c3wzwzc3wzwzc3wz.png" alt="Yassine El Khamlichi">
      </div>
      <h1 class="reveal">Yassine El Khamlichi</h1>
      <h2 id="hero_title" class="reveal"></h2>
      <p id="hero_phrase" class="reveal" style="max-width: 600px; color: var(--text-dim); margin-bottom: 2rem;"></p>
      <a href="/YassineElKhamlichi-cv.pdf" class="btn reveal" id="cv_btn" target="_blank">CV (PDF)</a>
    </section>

    <section id="about">
      <h2 id="about_title" class="section-title reveal"></h2>
      <div class="container reveal">
        <div class="card" style="border-left: 4px solid var(--gold);">
          <p id="about_text" style="font-size: 1.2rem;"></p>
        </div>
      </div>
    </section>

    <section id="education">
      <h2 id="edu_title" class="section-title reveal"></h2>
      <div class="container timeline">
        <div class="timeline-item reveal">
          <div class="year">24-25</div>
          <div class="card">
            <h3 id="edu_1_title"></h3>
            <p id="edu_1_details" class="academic-detail"></p>
          </div>
        </div>
        <div class="timeline-item reveal">
          <div class="year">23-25</div>
          <div class="card">
            <h3 id="edu_2_title"></h3>
            <p id="edu_2_details" class="academic-detail"></p>
          </div>
        </div>
        <div class="timeline-item reveal">
          <div class="year">22-23</div>
          <div class="card">
            <h3 id="edu_3_title"></h3>
            <p id="edu_3_details" class="academic-detail"></p>
          </div>
        </div>
      </div>
    </section>

    <section id="experience">
      <h2 id="exp_title" class="section-title reveal"></h2>
      <div class="container exp-grid">
        <div class="card reveal">
          <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" alt="Catering" class="card-img">
          <h3 style="margin-bottom: 1rem;" id="exp_rest_title"></h3>
          <p id="exp_rest_desc" style="color: var(--text-dim);"></p>
        </div>
        <div class="card reveal">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" alt="Logistics" class="card-img">
          <h3 style="margin-bottom: 1rem;" id="exp_log_title"></h3>
          <p id="exp_log_desc" style="color: var(--text-dim);"></p>
        </div>
        <div class="card reveal">
          <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80" alt="Events" class="card-img">
          <h3 style="margin-bottom: 1rem;" id="exp_event_title"></h3>
          <p id="exp_event_desc" style="color: var(--text-dim);"></p>
        </div>
      </div>
    </section>

    <section id="gallery">
       <div class="container reveal">
          <div class="slider-wrapper">
            <img src="/WhatsApp Image 2026-02-11 at 00.17.32.jpeg" class="slide active">
            <img src="/WhatsApp Image 2026-02-11 at 00.10.14 (1).jpeg" class="slide">
            <img src="/WhatsApp Image 2026-02-11 at 00.15.07.jpeg" class="slide">
          </div>
       </div>
    </section>

    <section id="skills">
      <h2 id="skills_title" class="section-title reveal"></h2>
      <div class="container skills-grid">
        <div class="reveal">
          <h3 id="skills_tech" style="color: var(--gold); margin-bottom: 2rem; font-size: 2rem;"></h3>
          <ul class="skill-list">
            <li id="skills_tech_1"></li>
            <li id="skills_tech_2"></li>
            <li id="skills_tech_3"></li>
            <li id="skills_tech_4"></li>
          </ul>
        </div>
        <div class="reveal">
          <h3 id="skills_pers" style="color: var(--gold); margin-bottom: 2rem; font-size: 2rem;"></h3>
          <ul class="skill-list">
            <li id="skills_pers_1"></li>
            <li id="skills_pers_2"></li>
            <li id="skills_pers_3"></li>
            <li id="skills_pers_4"></li>
          </ul>
        </div>
      </div>
    </section>

    <section id="languages">
      <h2 id="lang_title" class="section-title reveal"></h2>
      <div class="container exp-grid">
        <div class="card reveal lang-card">
          <div class="lang-circle">
            <img src="https://flagcdn.com/ma.svg" alt="Arabic" class="lang-logo">
          </div>
          <p id="lang_ar" style="font-weight: 700;"></p>
        </div>
        <div class="card reveal lang-card">
          <div class="lang-circle">
            <img src="https://flagcdn.com/fr.svg" alt="French" class="lang-logo">
          </div>
          <p id="lang_fr" style="font-weight: 700;"></p>
        </div>
        <div class="card reveal lang-card">
          <div class="lang-circle">
            <img src="https://flagcdn.com/es.svg" alt="Spanish" class="lang-logo">
          </div>
          <p id="lang_es" style="font-weight: 700;"></p>
        </div>
        <div class="card reveal lang-card">
          <div class="lang-circle">
            <img src="https://flagcdn.com/gb.svg" alt="English" class="lang-logo">
          </div>
          <p id="lang_en" style="font-weight: 700;"></p>
        </div>
      </div>
    </section>

    <section id="certifications">
      <h2 id="cert_title" class="section-title reveal"></h2>
      <div class="container certs-container">
        <div class="card reveal cert-card">
          <div class="cert-img-container">
            <img src="/WhatsApp Image 2026-02-11 at 00.10.16.jpeg" alt="Certification 1" class="cert-img">
          </div>
          <p id="cert_1" style="font-weight: 700; color: var(--gold); text-align: center; margin-top: 1.5rem;"></p>
        </div>
        <div class="card reveal cert-card">
          <div class="cert-img-container">
            <img src="/WhatsApp Image 2026-02-11 at 00.10.17.jpeg" alt="Certification 2" class="cert-img">
          </div>
          <p id="cert_2" style="font-weight: 700; color: var(--gold); text-align: center; margin-top: 1.5rem;"></p>
        </div>
      </div>
    </section>

    <section id="objective">
      <div class="container reveal" style="text-align: center;">
        <h2 id="obj_title" class="section-title"></h2>
        <div class="card" style="background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 100%); border: 1px solid var(--gold);">
          <p id="obj_text" style="font-size: 1.5rem; font-family: 'Playfair Display', serif; font-style: italic;"></p>
        </div>
      </div>
    </section>
  </main>

  <footer class="creative-footer">
    <div class="container footer-grid">
      <div class="footer-col reveal">
        <h3 id="footer_contact"></h3>
        <p>Email: y.elkhamilichi118@gmail.com</p>
        <p>Tel: +34 632 97 36 89</p>
        <p id="footer_location"></p>
      </div>
      <div class="footer-col reveal">
        <h3 id="footer_links"></h3>
        <ul style="list-style: none; padding: 0;">
          <li><a href="#home" class="footer-link" data-id="nav_home">Inicio</a></li>
          <li><a href="#about" class="footer-link" data-id="nav_about">Sobre mí</a></li>
          <li><a href="#education" class="footer-link" data-id="nav_education">Formación</a></li>
          <li><a href="#experience" class="footer-link" data-id="nav_experience">Experiencia</a></li>
        </ul>
      </div>
      <div class="footer-col reveal">
        <div class="footer-logo">YASSINE EL KHAMLICHI</div>
        <p>&copy; 2026 Yassine El Khamlichi.</p>
        <p style="color: var(--gold);">Excellence in Tourism & Logistics.</p>
      </div>
    </div>
  </footer>
`
