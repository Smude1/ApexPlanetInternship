// Form Validation

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let formMessage = document.getElementById("formMessage");

    if(name === "" || email === "" || message === "") {

        formMessage.style.color = "red";
        formMessage.innerText = "Please fill all fields";

        return;
    }

    if(!email.includes("@")) {

        formMessage.style.color = "red";
        formMessage.innerText = "Enter valid email";

        return;
    }

    formMessage.style.color = "green";
    formMessage.innerText = "Form Submitted Successfully!";
});


// To-Do List

function addTask() {

    let taskInput = document.getElementById("taskInput");

    let taskValue = taskInput.value;

    if(taskValue === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        ${taskValue}
        <button class="delete-btn" onclick="deleteTask(this)">
            Delete
        </button>
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}


// Delete Task

function deleteTask(button) {

    button.parentElement.remove();
}