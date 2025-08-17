const card1 = document.querySelector(".p1");
const card2 = document.querySelector(".p2");
const card3 = document.querySelector(".p3");

function loadFromLocalStorage() {
  let habitsConcluides = Number(
    localStorage.getItem("habitsConcluides")
  );
  card1.innerHTML = habitsConcluides;

  let totalHabits = Number(localStorage.getItem("totalHabits"));
  let totalTasksConcluides = Number(
    localStorage.getItem("totalTasksConcluides")
  );

  let percent = 0;
  if (totalHabits > 0) {
    percent = Math.round((totalTasksConcluides / totalHabits) * 100);
  }
  card2.innerHTML = percent + "%";

  let perfectDays = Number(localStorage.getItem("perfectDays"));
  card3.innerHTML = perfectDays;
}
loadFromLocalStorage();