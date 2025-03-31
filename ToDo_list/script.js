
const currentDate = new Date();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const day = currentDate.getDate();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = months[currentDate.getMonth()];

const cancelButton = document.getElementById("cancel");
const addButton = document.getElementById("add");
const showCreateFormButton = document.getElementById("show-create-form");
const createForm = document.querySelector(".create-form");
const deleteTodoButton = document.getElementById("delete");
const todoList = document.querySelector(".todo-list");
const filterActiveButton = document.getElementById("filter-active");
const filterDoneButton = document.getElementById("filter-done");
const filterAllButton = document.getElementById("filter-all");
const searchInput = document.querySelector(".search-field__input");
const titleForm = document.getElementById("create-form__title");
const overlay = document.querySelector(".overlay");
const inputText = document.getElementById("input");
const inputDate = document.getElementById("datetime");


let backgroundBlock;
let indexTodo = 0;
let buttonNumber = 1;
let Edit = false;


document.getElementById("dayofweek").textContent = dayOfWeek;
document.getElementById("dayofmonth").textContent = `${day} ${month}`;

const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage")) || [];
  filterAllButton.style.background = "#e8def8";
  renderTodos(todosStorage);
  comingTaskTodo();
})


function errorForm() {
  setTimeout(() => {
    inputDate.style.background = "none";
    inputText.style.background = "none";
  }, 1000);
  inputDate.style.background = " #e8def8";
  inputText.style.background = " #e8def8";
}

function saveForm() {
  if (!Edit) {
    createTodo();
    const todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
    switch (buttonNumber) {
      case 1:
        renderTodos(todosStorage);
        break;
      case 2:
        filterActive();
        break;
      case 3:
        filterDone();
        break;
    }
    overlay.style.display = "none";
    createForm.classList.remove("active");
    showCreateFormButton.classList.remove("active");
    createForm.reset();
  } else {
    const todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
    todosStorage[indexTodo].inputText = document.getElementById("input").value;
    todosStorage[indexTodo].inputDate = document.getElementById("datetime").value;
    localStorage.setItem("todosStorage", JSON.stringify(todosStorage));
    Edit = false;
    switch (buttonNumber) {
      case 1:
        renderTodos(todosStorage);
        break;
      case 2:
        filterActive();
        break;
      case 3:
        filterDone();
        break;
    }
    overlay.style.display = "none";
    titleForm.textContent = "Create a task";
    createForm.classList.remove("active");
    showCreateFormButton.classList.remove("active");
    createForm.reset();
  }
}

function comingTaskTodo() {
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
  if (!todosStorage || todosStorage.length === 0) {
    document.getElementById("todays-date").textContent = "Is missing";
    document.getElementById("todays-text").textContent = "";
    return;
  };
  const newTodosStorage = todosStorage.filter((todo) => todo.done === false).sort((a, b) => new Date(a.inputDate) - new Date(b.inputDate));
  const day = newTodosStorage[0];
  const date = new Date(day.inputDate);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("todays-date").textContent = formattedDate;
  document.getElementById("todays-text").textContent = day.inputText;
}

function createTodo() {
  const inputText = document.getElementById("input").value;
  const inputDate = document.getElementById("datetime").value;
  const newTodo = {
    id: "todo_" + Math.random().toString(16).slice(2),
    createdAt: new Date(),
    inputDate,
    inputText,
    done: false,
  };

  let todosStorage = JSON.parse(localStorage.getItem("todosStorage")) || [];
  todosStorage.push(newTodo);
  localStorage.setItem("todosStorage", JSON.stringify(todosStorage));
}

function deleteTodo(id) {
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
  const newTodosStorage = todosStorage.filter((todo) => todo.id !== id);
  localStorage.setItem("todosStorage", JSON.stringify(newTodosStorage));
  switch (buttonNumber) {
    case 1:
      renderTodos(newTodosStorage);
      break;
    case 2:
      filterActive();
      break;
    case 3:
      filterDone();
      break;
  }
}

function changeDone(id) {
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
  const newTodosStorage = todosStorage.map((todo) => {
    if (todo.id === id) {
      todo.done = !todo.done;
    }
    return todo;
  });
  localStorage.setItem("todosStorage", JSON.stringify(newTodosStorage));
  switch (buttonNumber) {
    case 1:
      renderTodos(newTodosStorage);
      break;
    case 2:
      filterActive();
      break;
    case 3:
      filterDone();
      break;
  }
}

function EditTodo(id) {
  overlay.style.display = "block";
  Edit = true;
  backgroundBlock = document.getElementById(id);
  backgroundBlock.classList.add("changeColor");
  titleForm.textContent = "Изменить задачу";
  createForm.classList.add("active");
  showCreateFormButton.classList.add("active");
  let todosStorage = JSON.parse(localStorage.getItem("todosStorage")) || [];
  let index = todosStorage.findIndex((todo) => todo.id === id);
  document.getElementById("input").value = todosStorage[index].inputText;
  document.getElementById("datetime").value = todosStorage[index].inputDate;
  indexTodo = index;
}


function filterActive() {
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage")) || [];
  const newTodosStorage = todosStorage.filter((todo) => todo.done === false);
  renderTodos(newTodosStorage);
}

function filterDone() {
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage")) || [];
  const newTodosStorage = todosStorage.filter((todo) => todo.done === true);
  renderTodos(newTodosStorage);
}

function searchInputValue() {
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage")) || [];
  const Result = todosStorage.filter((todo) => todo.inputText.toLowerCase().includes(searchInput.value.toLowerCase()));
  renderTodos(Result);
}

function changeColorButton(e) {
  if (e.target.id === "filter-active") {
    filterActiveButton.style.background = "#e8def8";
    filterDoneButton.style.background = "#fff";
    filterAllButton.style.background = "#fff";
  } else if (e.target.id === "filter-done") {
    filterDoneButton.style.background = "#e8def8";
    filterActiveButton.style.background = "#fff";
    filterAllButton.style.background = "#fff";
  } else if (e.target.id === "filter-all") {
    filterAllButton.style.background = "#e8def8";
    filterActiveButton.style.background = "#fff";
    filterDoneButton.style.background = "#fff";
  }
}

function renderTodos(todosStorage) {
  const container = document.querySelector(".todo-list");
  container.innerHTML = "";
  todosStorage.forEach(element => {
    const date = new Date(element.inputDate);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    container.insertAdjacentHTML("beforeend",
      `
      <li class="todo-block" id="${element.id}">
        <label class="checkbox" for="checkbox">
          <input type="checkbox" name="checkbox" ${element.done ? "checked" : ""} onclick="changeDone('${element.id}')"/>
          <span class="material-symbols-rounded checkbox__check-icon">
            check
          </span>
        </label>
        <div class="todo-block__data">
          <div onclick="EditTodo('${element.id}')">
          <p class="todo-block__date">${formattedDate}</p>
          <h3 class="todo-block__title">${element.inputText}</h3>
         </div>
          <span class="material-symbols-outlined" onclick="deleteTodo('${element.id}')">
            close
            </span>
        </div>
      </li>
        `
    );
  });
  comingTaskTodo();
}

showCreateFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "block";
  createForm.classList.add("active");
  showCreateFormButton.classList.add("active");
});

cancelButton.addEventListener("click", () => {
  overlay.style.display = "none";
  createForm.classList.remove("active");
  showCreateFormButton.classList.remove("active");
  backgroundBlock.classList.remove("changeColor");
  Edit = false;
});

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const today = new Date().toISOString().split("T")[0];
  if (inputText.value.trim() === "" || inputDate.value.trim() === "" || inputDate.value.slice(0, 10) < today) {
    errorForm();
  } else {
    saveForm();
  }
}
);


filterActiveButton.addEventListener("click", (e) => {
  buttonNumber = 2;
  e.preventDefault();
  changeColorButton(e);
  filterActiveButton.style.background = "#e8def8";
  filterActive();
});

filterDoneButton.addEventListener("click", (e) => {
  buttonNumber = 3;
  e.preventDefault();
  changeColorButton(e);
  filterDoneButton.style.background = "#e8def8";
  filterDone();
});

filterAllButton.addEventListener("click", (e) => {
  buttonNumber = 1;
  e.preventDefault();
  changeColorButton(e);
  filterAllButton.style.background = "#e8def8";
  const todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
  renderTodos(todosStorage);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    overlay.style.display = "none";
    createForm.classList.remove("active");
    showCreateFormButton.classList.remove("active");
    createForm.reset();
    Edit = false;
  }

  if (e.key === "Enter") {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    console.log(today);
    console.log(inputDate.value.slice(0, 10));
    if (inputText.value.trim() === "" || inputDate.value.trim() === "" || inputDate.value < today) {
      errorForm();
    } else {
      saveForm();
  }
  }
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  createForm.classList.remove("active");
  showCreateFormButton.classList.remove("active");
  createForm.reset();
  Edit = false;
});

searchInput.addEventListener("input", searchInputValue);


