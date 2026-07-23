const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navScrim = document.querySelector('[data-nav-scrim]');

function setNavigationState(isOpen) {
  siteNav?.classList.toggle('open', isOpen);
  navScrim?.classList.toggle('open', isOpen);
  menuToggle?.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
  menuToggle?.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
}

menuToggle?.addEventListener('click', () => {
  setNavigationState(!siteNav?.classList.contains('open'));
});

navScrim?.addEventListener('click', () => setNavigationState(false));

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => setNavigationState(false));
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) setNavigationState(false);
});

document.querySelectorAll('.job-summary').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.job-item');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    item.classList.toggle('open', !expanded);
    button.setAttribute('aria-expanded', String(!expanded));
  });
});

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.faq-item');
    const willOpen = !currentItem.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach((item) => {
      item.classList.remove('open');
      const itemButton = item.querySelector('.faq-question');
      itemButton.setAttribute('aria-expanded', 'false');
      itemButton.lastElementChild.textContent = '+';
    });

    if (willOpen) {
      currentItem.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      button.lastElementChild.textContent = '−';
    }
  });
});

const modal = document.querySelector('#application-modal');
const roleSelect = document.querySelector('#role-interest');
const fullNameInput = document.querySelector('#full-name');
const formStatus = document.querySelector('#form-status');
const applicationForm = document.querySelector('#application-form');

function openApplicationForm(role = '') {
  if (!modal) return;

  const selectedRole = role || 'Open to suitable roles';
  if (roleSelect) roleSelect.value = selectedRole;
  if (formStatus) formStatus.textContent = '';

  modal.hidden = false;
  document.body.classList.add('no-scroll');
  setNavigationState(false);

  window.setTimeout(() => fullNameInput?.focus(), 60);
}

function closeApplicationForm() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('no-scroll');
}

document.querySelectorAll('[data-open-form]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openApplicationForm(trigger.dataset.role || '');
  });
});

document.querySelectorAll('[data-close-form]').forEach((trigger) => {
  trigger.addEventListener('click', closeApplicationForm);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeApplicationForm();
});

applicationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formStatus) {
    formStatus.textContent = 'Thank you. Redirecting you now...';
  }
  applicationForm.reset();
  if (roleSelect) roleSelect.value = 'Open to suitable roles';
  window.setTimeout(() => {
    window.location.href = 'thank-you/';
  }, 450);
});

const searchInput = document.querySelector('#job-search');
const workFilter = document.querySelector('#work-filter');
const searchButton = document.querySelector('#search-jobs');
const jobItems = [...document.querySelectorAll('.job-item')];
const noResults = document.querySelector('#no-results');

function filterJobs() {
  const query = searchInput?.value.trim().toLowerCase() || '';
  const type = workFilter?.value || 'all';
  let visibleCount = 0;

  jobItems.forEach((item) => {
    const matchesTitle = item.dataset.title.includes(query);
    const itemType = item.dataset.type || '';
    const matchesType = type === 'all' || itemType === type || (type === 'remote' && item.textContent.toLowerCase().includes('remote'));
    const visible = matchesTitle && matchesType;
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (noResults) noResults.hidden = visibleCount !== 0;
  document.querySelector('#jobs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

searchButton?.addEventListener('click', filterJobs);
searchInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') filterJobs();
});
workFilter?.addEventListener('change', filterJobs);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
