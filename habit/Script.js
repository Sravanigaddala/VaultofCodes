document.addEventListener("DOMContentLoaded", () => {
  // put all your code here// DOM Elements
const modal = document.getElementById('habit-modal');
const createHabitBtn = document.getElementById('create');
const modalHabitName = document.getElementById('habit-name');
const closeModalBtn = document.querySelector('.close');

const habitInput = document.getElementById('habit-input');
const addHabitBtn = document.getElementById('add-btn');
const habitList = document.getElementById('habit-list');
const toast = document.getElementById('toast');

let habits = JSON.parse(localStorage.getItem('habits')) || [];
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});


// Toast function
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Save habits to localStorage
function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

// Create calendar days for a habit
function createCalendar(habitId, calendar) {
  calendar.innerHTML = '';
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.textContent = i;
    if (habits[habitId].completedDays.includes(i)) {
      day.classList.add('completed');
    }
    day.addEventListener('click', () => {
      const index = habits[habitId].completedDays.indexOf(i);
      if (index === -1) {
        habits[habitId].completedDays.push(i);
        showToast("✅ Marked Day " + i + " as completed!");
      } else {
        habits[habitId].completedDays.splice(index, 1);
        showToast("❌ Unmarked Day " + i);
      }
      saveHabits();
      createCalendar(habitId, calendar);
    });
    calendar.appendChild(day);
  }
}

// Render all habits
function renderHabits() {
  habitList.innerHTML = '';
  habits.forEach((habit, index) => {
    const habitDiv = document.createElement('div');
    habitDiv.classList.add('habit');

    const header = document.createElement('div');
    header.classList.add('habit-header');

    const name = document.createElement('div');
    name.classList.add('habit-name');
    name.textContent = habit.name;

    const actions = document.createElement('div');
    actions.classList.add('habit-actions');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
      showToast("🗑️ Habit deleted");
    });

    actions.appendChild(deleteBtn);
    header.appendChild(name);
    header.appendChild(actions);

    const calendar = document.createElement('div');
    calendar.classList.add('calendar');
    createCalendar(index, calendar);

    habitDiv.appendChild(header);
    habitDiv.appendChild(calendar);

    habitList.appendChild(habitDiv);
  });
}

// Add habit
addHabitBtn.addEventListener('click', () => {
  const habitName = habitInput.value.trim();
  if (habitName === '') return;
  habits.push({ name: habitName, completedDays: [] });
  habitInput.value = '';
  saveHabits();
  renderHabits();
  showToast("🎉 Habit added successfully!");
});
createHabitBtn.addEventListener('click', (e) => {
    e.preventDefault();
  const habitName = modalHabitName.value.trim();
  if (habitName === '') {
    showToast("⚠️ Please enter a habit name.");
    return;
  }
  habits.push({ name: habitName, completedDays: [] });
  saveHabits();
  renderHabits();
  showToast("🎉 Habit created!");
  modal.style.display = 'none';
  modalHabitName.value = '';
});

// Initial render
renderHabits();

});
