function addHabit() {
  const input = document.querySelector(".input-tasks");
  const habitName = input.value.trim();
  const shift = document.querySelector('input[name="shift"]:checked');
  const daysPerWeek = document.querySelector('input[name="days-per-week"]:checked');

  if (habitName !== "") {
    let totalHabits = parseInt(localStorage.getItem("totalHabits")) || 0;

    totalHabits++;

    localStorage.setItem("habitName", habitName);
    localStorage.setItem("shift", shift.value);
    localStorage.setItem("daysPerWeek", daysPerWeek.value);
    localStorage.setItem("totalHabits", totalHabits);

    window.location.replace("index.html")
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}