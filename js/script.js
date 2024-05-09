{
  let tasks = [];
  let hideDoneTasks = false;

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
        <li class=
        "tasks__item${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
      <button class="tasks__button tasks__button--toggleDone js-toggleDone">
        ${task.done ? "✓" : ""}
        </button>
        <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
        ${task.content}
        </span>
        <button class="tasks__button tasks__button--remove js-remove">
        🗑️
        </button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => {
    const buttonElements = document.querySelector(".js-buttons");

    if (tasks.length === 0) {
      htmlButtonString = "";
    } else {
      htmlButtonString = "";
      htmlButtonString += `
        <button class= "js-toggleHideDoneTasks section__button--header">
        ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button class= "section__button--header section__button--hiddenAllDone js-doneAllTasks"
        ${tasks.every(({ done }) => done) ? "disabled" : ""} Ukończ wszystkie
        </button>
        `;
    }
    document.querySelector(".js-buttons").innerHTML = htmlButtonString;
  };

  const bindButtonsEvents = () => {
    const hideTasksButton = document.querySelector(".js-toggleHideDoneTasks");

    if (hideTasksButton) {
      hideTasksButton.addEventListener("click", toggleHideDoneTasks);
    }

    const doneAllTasks = document.querySelector(".js-doneAllTasks");
    if (doneAllTasks) {
      doneAllTasks.addEventListener("click", toggleAllTasksDone);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const onFormSumbit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSumbit);
  };
  init();
}
