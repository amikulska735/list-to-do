{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render(); 
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
              class="list__item">
            <button class="list__button--done js-done${task.done ? " emoji " : ""}">
            </button>
            <span class="list__newTask${task.done ? " list__item--done " : ""}">${task.content}</span>
           <button class="list__button--remove js-remove"></button>
            </li><hr></hr>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

       const newTaskInput = document.querySelector(".js-newTask");
       const newTaskContent = newTaskInput.value.trim();
       
       if(newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskInput.value = "";
       }
       newTaskInput.focus();
    };

    const init = () => {
     render();

     const form = document.querySelector(".js-form");

     form.addEventListener("submit", onFormSubmit);
    };

    init();
}