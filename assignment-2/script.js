const internships = [
  { title:'Web Dev Internship', duration:'1-2 mo', location:'Virtual', stipend:'-', start:'05/11/2023', desc:'Learn HTML/CSS/JS...' },
  { title:'App Dev Internship', duration:'1-2 mo', location:'Virtual', stipend:'-', start:'05/11/2023', desc:'Build Android/iOS apps...' },
  { title:'Python Internship', duration:'1-2 mo', location:'Virtual', stipend:'-', start:'05/11/2023', desc:'Work on Python projects...' },
  { title:'Java Internship', duration:'1-2 mo', location:'Virtual', stipend:'-', start:'05/11/2023', desc:'Learn Java & OOP...' }
];

const listEl = document.getElementById('internship-list');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const themeToggle = document.getElementById('theme-toggle');
const userPref = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', userPref);
themeToggle.textContent = userPref === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
});

function renderList(items) {
  listEl.innerHTML = '';
  items.forEach((i, idx) => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <h2>${i.title}</h2>
      <ul><li>Duration: ${i.duration}</li><li>Location: ${i.location}</li><li>Stipend: ${i.stipend}</li><li>Start: ${i.start}</li></ul>
      <button class="btn" data-idx="${idx}">View Details</button>`;
    listEl.append(card);
  });
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => showModal(items[e.target.dataset.idx]));
  });
}

function showModal(item) {
  modalContent.innerHTML = `
    <h2>${item.title}</h2>
    <p><strong>Details:</strong> ${item.desc}</p>
    <ul><li>Duration: ${item.duration}</li><li>Location: ${item.location}</li><li>Stipend: ${item.stipend}</li><li>Start: ${item.start}</li></ul>`;
  modal.classList.remove('hidden');
}

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => { if(e.target === modal) modal.classList.add('hidden'); });

searchEl.addEventListener('input', e => {
  const filtered = internships.filter(i => i.title.toLowerCase().includes(e.target.value.toLowerCase()));
  renderList(filtered);
});

renderList(internships);
