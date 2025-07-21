// Dummy student data
const dummyData = {
  "sravani@gmail.com": {
    name: "Gaddala Sravani",
    email: "sravani@gmail.com",
    mobile: "987XXXXXXX",
    domain: "Web Development",
    college: "Chaitanya Bharathi Institute of Technology",
    start: "01 June 2023",
    duration: "4 years",
    assignments: [true, false, true, true],
    certificate: "#",
    photo: "https://via.placeholder.com/130"
  }
};

// Show/hide toast message
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.className = 'toast show';
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

// Show/hide loading spinner
function showSpinner(show) {
  document.querySelector('.spinner').style.display = show ? 'block' : 'none';
}

// Reset form inputs and results
function resetForm() {
  document.getElementById('identifier').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('suggestions').style.display = 'none';
}

// Theme toggle with localStorage
function toggleTheme() {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
}

// Load stored theme on startup
window.onload = () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
};

// Show autocomplete suggestions while typing
function showSuggestions(value) {
  const suggestionBox = document.getElementById('suggestions');
  if (!value) {
    suggestionBox.style.display = 'none';
    return;
  }

  const matches = Object.keys(dummyData).filter(key => key.includes(value.toLowerCase()));
  suggestionBox.innerHTML = matches
    .map(email => `<div onclick="selectSuggestion('${email}')">${email}</div>`)
    .join('');
  suggestionBox.style.display = matches.length ? 'block' : 'none';
}

// Fill input with selected suggestion
function selectSuggestion(email) {
  document.getElementById('identifier').value = email;
  document.getElementById('suggestions').style.display = 'none';
}

// Verify student data
function verifyStudent() {
  const idInput = document.getElementById('identifier');
  const id = idInput.value.trim().toLowerCase();
  const resultBox = document.getElementById('result');

  if (!id) {
    alert('Please enter a valid Email or ID');
    return;
  }

  showSpinner(true);

  setTimeout(() => {
    const student = dummyData[id];

    if (!student) {
      showSpinner(false);
      resultBox.innerHTML = `
        <div class="card">
          <h3>No record found for "${id}"</h3>
          <p>If you think this is an error, please 
            <a href="mailto:team@vaultofcodes.in?subject=Certificate Not Found&body=My email/ID: ${id}" style="color:#007bff">contact support</a> or 
            <a href="#" onclick="openForm()">click here</a> to add your information.
          </p>
        </div>`;
      showToast('⚠️ No record found.');
      return;
    }

    const html = `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">
            <img src="${student.photo}" alt="Photo" width="100" />
            <h3>${student.name}</h3>
            <p><strong>Domain:</strong> ${student.domain}</p>
            <button onclick="copyEmail('${student.email}')">📋 Copy Email</button>
          </div>
          <div class="card-back">
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Mobile:</strong> ${student.mobile}</p>
            <p><strong>College:</strong> ${student.college}</p>
            <p><strong>Start Date:</strong> ${student.start}</p>
            <p><strong>Duration:</strong> ${student.duration}</p>
            <p><strong>Assignment Status:</strong><br> 
              ${student.assignments.map((done, i) => `A${i + 1}: ${done ? '✅' : '❌'}`).join(' | ')}
            </p>
            <a href="${student.certificate}" target="_blank">🎓 View Certificate</a>
          </div>
        </div>
      </div>
    `;

    resultBox.innerHTML = html;
    showSpinner(false);
    showToast('✅ Record loaded successfully.');
  }, 1200);
}

// Copy email to clipboard
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    showToast("📋 Email copied to clipboard!");
  });
}

// Open form to submit info
function openForm() {
  alert('Redirecting to data submission form...');
  window.open('https://forms.gle/your-form-link', '_blank');
}
