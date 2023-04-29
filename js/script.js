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

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

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
              class="tasks__item js-task">
            <button class="tasks__button tasks__button--toggleDone js-toggleDone${task.done ? " emoji " : ""}">
            </button>
            <span class="tasks__content${task.done ? " tasks__content--done " : ""}">${task.content}</span>
           <button class="tasks__button tasks__button--remove js-remove">
             🗑
           </button>
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