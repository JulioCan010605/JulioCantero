document.addEventListener('DOMContentLoaded', function () {
    var taskList = [];

    // Función para actualizar los contadores de tareas

    function updateCounters() {
        var totalTasks = taskList.length;
        var completedTasks = taskList.filter(function (task) {
            return task.completed;
        }).length;

        document.getElementById("total-counter").textContent = totalTasks;
        document.getElementById("completed-counter").textContent = completedTasks;
    }
// Función para renderizar la lista de tareas en el documento HTML
    function renderTaskList() {
        var list = document.querySelector("#task-list ul");
        list.innerHTML = "";

        taskList.forEach(function (task, index) {
            var listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.setAttribute("data-index", index);

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", function () {
                task.completed = this.checked;
                updateCounters();
            });

            var label = document.createElement("label");
            label.textContent = task.title + " - " + task.subject;

            var completeBtn = document.createElement("button");
            completeBtn.className = "btn btn-success float-right complete-btn";
            completeBtn.textContent = "Completada";
            completeBtn.addEventListener("click", function () {
                task.completed = true;
                checkbox.checked = true;
                updateCounters();
            });

            var deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-danger float-right delete-btn";
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener("click", function () {
                taskList.splice(index, 1);
                renderTaskList();
                updateCounters();
            });

            var moveUpBtn = document.createElement("button");
            moveUpBtn.className = "btn btn-warning float-right move-up-btn";
            moveUpBtn.textContent = "↑";
            moveUpBtn.disabled = (index === 0);
            moveUpBtn.addEventListener("click", function () {
                var currentIndex = index;
                var newIndex = currentIndex - 1;
                taskList.splice(newIndex, 0, taskList.splice(currentIndex, 1)[0]);
                renderTaskList();
            });

            var moveDownBtn = document.createElement("button");
            moveDownBtn.className = "btn btn-warning float-right move-down-btn";
            moveDownBtn.textContent = "↓";
            moveDownBtn.disabled = (index === taskList.length - 1);
            moveDownBtn.addEventListener("click", function () {
                var currentIndex = index;
                var newIndex = currentIndex + 1;
                taskList.splice(newIndex, 0, taskList.splice(currentIndex, 1)[0]);
                renderTaskList();
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(completeBtn);
            listItem.appendChild(deleteBtn);
            listItem.appendChild(moveUpBtn);
            listItem.appendChild(moveDownBtn);

            list.appendChild(listItem);
        });

        updateCounters();
    }
    // Evento para agregar una nueva tarea

    document.getElementById("task-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Convertir a minúsculas

        var title = document.getElementById("title").value.toLowerCase();
        var subject = document.getElementById("subject").value;

        if (title.trim() === '') {
            alert("Por favor, ingresa un título para la tarea.");
            return;
        }

        if (subject === '') {
            alert("Por favor, selecciona una materia para la tarea.");
            return;
        }

        // Comparar en minúsculas

        if (taskList.some(function (task) {
            return task.title.toLowerCase() === title; 
        })) {
            alert("Esta tarea ya existe.");
            return;
        }

        if (subject === 'Otra') {
            var otherSubjectInput = document.getElementById("other-subject-input").value;
            if (otherSubjectInput.trim() === '') {
                alert("Por favor, ingresa el nombre de la otra materia.");
                return;
            }
            subject = otherSubjectInput;
        }

        var task = {
            title: title,
            subject: subject,
            completed: false
        };

        taskList.push(task);
        document.getElementById("task-form").reset();
        renderTaskList();
    });

    document.getElementById("subject").addEventListener("change", function () {
        var otherSubject = document.getElementById("other-subject");
        if (this.value === "Otra") {
            otherSubject.style.display = "block";
        } else {
            otherSubject.style.display = "none";
        }
    });
// Renderiza la lista de tareas al cargar la página
    renderTaskList();
});