let arrayTasks = [];
let tasksConcluides = 0;
let habitsConcluides = 0;
let totalTasksConcluides = 0;
let perfectDays = 0;
let totalHabits = 0;
let imgIcon = "";
const divNumbers = document.querySelector(".div-numbers");
const msgNumberTasks = document.querySelector(".msg-number-tasks");
const element1Img = document.querySelector(".element1-img");
const numberTasks = document.querySelector(".number-tasks");
const ulTasks = document.querySelector(".ul-tasks");
const message = document.querySelector(".message");

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(arrayTasks));
  localStorage.setItem("tasksConcluides", tasksConcluides);
  localStorage.setItem("habitsConcluides", habitsConcluides);
  localStorage.setItem(
    "totalTasksConcluides",
    totalTasksConcluides
  );
  localStorage.setItem("perfectDays", perfectDays);
  localStorage.setItem("totalHabits", totalHabits);
}

function loadFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  const storedConcluides =
  localStorage.getItem("tasksConcluides");
  const storedHabits = localStorage.getItem("habitsConcluides");
  const storedTotal = localStorage.getItem(
    "totalTasksConcluides"
  );
  const storedDays = localStorage.getItem("perfectDays");
  const storedTotalHabits = localStorage.getItem("totalHabits");

  if (storedTasks) {
    arrayTasks = JSON.parse(storedTasks);
  }

  tasksConcluides = Number(storedConcluides) || 0;
  habitsConcluides = Number(storedHabits) || 0;
  totalTasksConcluides = Number(storedTotal) || 0;
  perfectDays = Number(storedDays) || 0;
  totalHabits = Number(storedTotalHabits) || 0;

  updateStatus();
}

function updateStatus() {
  let totalTasks = arrayTasks.filter(
    task => task.hidden === false
  ).length;
  divNumbers.innerHTML = tasksConcluides + " / " + totalTasks;

  if (totalTasks === 0) {
    msgNumberTasks.innerHTML = "Create a habit";
    element1Img.style.display = "flex";
    numberTasks.classList.remove("number-tasks-completeds");
  } else if (tasksConcluides === totalTasks) {
    msgNumberTasks.innerHTML = "Tasks completed";
    element1Img.style.display = "none";
    numberTasks.classList.add("number-tasks-completeds");

    addPerfectDays();
  } else {
    msgNumberTasks.innerHTML = "Keep it up";
    element1Img.style.display = "none";
    numberTasks.classList.remove("number-tasks-completeds");
  }
}

function shiftHourNow() {
  const hourNow = new Date();
  const hour = hourNow.getHours();
  let hourShift = "anytime";

  if (hour >= 6 && hour < 12) {
    hourShift = "morning";
    document.getElementById("morning").checked = true;
  } else if (hour >= 12 && hour < 18) {
    hourShift = "afternoon";
    document.getElementById("afternoon").checked = true;
  } else {
    hourShift = "evening";
    document.getElementById("evening").checked = true;
  }

  return hourShift;
}
function checkShift(shift) {
  ulTasks.innerHTML = "";

  document
  .querySelectorAll('input[name="shift"]')
  .forEach(input => (input.checked = false));

  const radio = document.getElementById(shift);
  if (radio) {
    radio.checked = true;
  }

  let filteredTasks = [];

  if (shift === "anytime") {
    filteredTasks = arrayTasks.filter(
      task => task && !task.hidden
    );
  } else {
    filteredTasks = arrayTasks.filter(
      task =>
      task &&
      (task.shift === shift ||
        task.shift === "anytime") &&
      !task.hidden
    );
  }

  if (filteredTasks.length === 0) {
    element1Img.style.display = "flex";
    message.innerHTML = "Without habits";
  } else {
    element1Img.style.display = "none";
    message.innerHTML = "";
  }

  localStorage.removeItem("shift");

  filteredTasks.forEach((task, i) => {
    const create = tag => document.createElement(tag);

    const elementLi = create("li");
    const containerLi = create("div");
    const buttonConcluide = create("button");
    const textTask = create("span");
    const buttonOptions = create("button");

    textTask.innerHTML = task.text;

    if (task.done) {
      const imgCheck = document.createElement("img");
      imgCheck.src = task.icon || "v-icon.png";
      imgCheck.className = "img-check";
      buttonConcluide.appendChild(imgCheck);
      elementLi.classList.add("element-li-concluide");
    }

    buttonOptions.innerHTML = "...";

    buttonOptions.onclick = () => {
      const modal = document.getElementById("modal-overlay");
      const deleteBtn = modal.querySelector(".delete");
      const restBtn = modal.querySelector(".rest");
      const cancelBtn = modal.querySelector(".cancel");
      modal.classList.remove("hidden");

      deleteBtn.onclick = () => {
        const shift =
        document.querySelector(
          'input[name="shift"]:checked'
        )?.id || "anytime";
        if (task.done) {
          tasksConcluides--;
        }
        arrayTasks.splice(i, 1);
        saveToLocalStorage();
        updateStatus();
        checkShift(shift || "shift");
        modal.classList.add("hidden");
      };

      restBtn.onclick = () => {
        const shift =
        document.querySelector(
          'input[name="shift"]:checked'
        )?.id || "anytime";
        if (!arrayTasks[i] || arrayTasks[i].done) return;

        const item = arrayTasks.splice(i, 1)[0];
        item.done = true;
        item.icon = "images/z-icon.png";
        item.timesDone = (item.timesDone || 0) + 1;

        tasksConcluides++;
        totalTasksConcluides++;
        arrayTasks.push(item);

        saveToLocalStorage();
        updateStatus();
        checkShift(shift || "shift");
        modal.classList.add("hidden");
      };

      cancelBtn.onclick = () => {
        modal.classList.add("hidden");
      };
    };

    elementLi.classList.add("element-li");
    textTask.className = "span-li";
    containerLi.className = "container-li";
    buttonConcluide.className = "concluide-button";
    buttonOptions.className = "edite-button";

    elementLi.appendChild(containerLi);
    containerLi.append(
      buttonConcluide,
      textTask,
      buttonOptions
    );
    ulTasks.appendChild(elementLi);

    buttonConcluide.onclick = () =>
    concluideTask(arrayTasks.indexOf(task));
  });
}

function restartTasksWeek() {
  let today = new Date();
  let dayWeek = today.getDay();
  let todayString = today.toDateString();
  let lastWeekReset = localStorage.getItem("weekReset");

  if (dayWeek === 0 && lastWeekReset !== todayString) {
    arrayTasks.forEach(task => {
      task.done = false;
      task.icon = "";
      task.hidden = false;
      task.timesDone = 0;
    });

    localStorage.setItem("weekReset", todayString);
    saveToLocalStorage();
  }

  arrayTasks.forEach(task => {
    if (task.timesDone >= task.daysPerWeek) {
      task.hidden = true;
      if (task.done) {
        tasksConcluides--;
        task.done = false;
      }
    }
  });

  saveToLocalStorage();
}

function restartTasks() {
  const now = new Date();
  const hour = now.getHours();
  const today = now.toISOString().split("T")[0];
  const lastReset = localStorage.getItem("lastReset");

  if (hour >= 6 && lastReset !== today) {
    arrayTasks.forEach(task => {
      task.done = false;
      task.icon = "";
    });

    totalHabits += Number(
      arrayTasks.filter(task => task.hidden === false).length
    );

    tasksConcluides = 0;

    saveToLocalStorage();
    localStorage.setItem("lastReset", today);
  }
}

function addPerfectDays() {
  const now = new Date();
  const hour = now.getHours();
  const today = now.toISOString().split("T")[0];
  const lastReset = localStorage.getItem("lastReset");

  if (hour >= 6 && lastReset !== today) {
    perfectDays++;
  }
}

function saveDatesWeek() {
  let totalTasks = arrayTasks.filter(task => task.hidden === false).length;

  let now = new Date();
  const hour = now.getHours();
  const today = now.toISOString().split("T")[0];
  const lastReset = localStorage.getItem("lastReset");

  const rateDay = Math.round(
    (tasksConcluides / totalTasks) * 100
  );

  if (hour >= 6) {
    localStorage.setItem("rateDay", rateDay);
  }
}

function concluideTask(i) {
  const shift =
  document.querySelector('input[name="shift"]:checked')?.id ||
  "anytime";
  if (!arrayTasks[i] || arrayTasks[i].done) return;

  arrayTasks[i].done = true;
  arrayTasks[i].icon = "images/v-icon.png";
  arrayTasks[i].timesDone++;

  tasksConcluides++;
  habitsConcluides++;
  totalTasksConcluides++;

  const item = arrayTasks.splice(i, 1)[0];
  arrayTasks.push(item);

  saveToLocalStorage();
  updateStatus();
  checkShift(shift);
}

window.onload = () => {
  history.replaceState(null, "", window.location.href);
  loadFromLocalStorage();

  const habitName = localStorage.getItem("habitName");
  const shift = localStorage.getItem("shift");
  const daysPerWeek = localStorage.getItem("daysPerWeek");

  restartTasksWeek();
  restartTasks();
  saveDatesWeek();

  if (habitName && shift) {
    const newTask = {
      done: false,
      text: habitName,
      shift: shift,
      timesDone: 0,
      hidden: false,
      daysPerWeek: daysPerWeek
    };

    arrayTasks.unshift(newTask);
    saveToLocalStorage();

    localStorage.removeItem("habitName");

    updateStatus();
    checkShift(shift);
    return;
  }

  const hourShift = shiftHourNow();
  updateStatus();
  checkShift(hourShift);
};