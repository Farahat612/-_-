document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const files = document.getElementById("files").files;
        const deadline = document.getElementById("deadline").value;

        // Create task item
        const taskItem = document.createElement("li");
        taskItem.className = "list-group-item my-2";
        const taskContent = document.createElement("div");
        taskContent.innerHTML = `
            <h5>${title}</h5>
            <p>${description}</p>
            <p>Date: ${date}</p>
            <p>Time: ${time}</p>
            <p>Deadline: ${deadline}</p>
        `;

        // Add files if any
        if (files.length > 0) {
            const filesList = document.createElement("ul");
            filesList.className += " my-3";
            filesList.textContent = "Files:";
            for (const file of files) {
                const fileItem = document.createElement("li");
                fileItem.textContent = file.name;
                filesList.appendChild(fileItem);
            }
            taskContent.appendChild(filesList);
        }

        taskItem.appendChild(taskContent);

        // Add Edit and Delete buttons
        const editButton = createButton("Edit", "btn-warning", function () {
            // Store current task details
            const currentDetails = {
                title: taskContent.querySelector("h5").textContent,
                description: taskContent.querySelector("p").textContent,
                date: taskContent.querySelector("p:nth-child(3)").textContent,
                time: taskContent.querySelector("p:nth-child(4)").textContent,
                deadline: taskContent.querySelector("p:last-child").textContent,
            };

            // Replace task details with input fields for editing
            const editForm = document.createElement("form");
            editForm.className = "edit-form my-2";

            const editTitle = createInput("text", "editTitle", currentDetails.title, "Edit Title");
            const editDescription = createInput("text", "editDescription", currentDetails.description, "Edit Description");
            const editDate = createInput("date", "editDate", currentDetails.date.split(": ")[1], "Edit Date");
            const editTime = createInput("time", "editTime", currentDetails.time.split(": ")[1], "Edit Time");
            const editFiles = createInput("file", "editFiles", null, "Edit Files");
            const editDeadline = createInput("date", "editDeadline", currentDetails.deadline.split(": ")[1], "Edit Deadline");

            // Set current values in the edit form
            const setEditValues = () => {
                editTitle.querySelector("input").value = currentDetails.title;
                editDescription.querySelector("input").value = currentDetails.description;
                editDate.querySelector("input").value = currentDetails.date.split(": ")[1];
                editTime.querySelector("input").value = currentDetails.time.split(": ")[1];
                editDeadline.querySelector("input").value = currentDetails.deadline.split(": ")[1];
            };

            setEditValues();

            const saveButton = createButton("Save", "btn-primary", function () {
                // Update task details with edited values
                taskContent.innerHTML = `
                    <h5>${editTitle.querySelector("input").value}</h5>
                    <p>${editDescription.querySelector("input").value}</p>
                    <p>Date: ${editDate.querySelector("input").value}</p>
                    <p>Time: ${editTime.querySelector("input").value}</p>
                    <p>Deadline: ${editDeadline.querySelector("input").value}</p>
                `;
                const editedFiles = editFiles.querySelector("input").files;
                if (editedFiles.length > 0) {
                    const filesList = document.createElement("ul");
                    for (const file of editedFiles) {
                        const fileItem = document.createElement("li");
                        fileItem.textContent = file.name;
                        filesList.appendChild(fileItem);
                    }
                    taskContent.appendChild(filesList);
                }

                // Remove the edit form
                taskItem.removeChild(editForm);
                // Show the buttons again
                taskItem.appendChild(editButton);
                taskItem.appendChild(deleteButton);
            });

            const cancelButton = createButton("Cancel", "btn-secondary", function () {
                // Remove the edit form without saving changes
                taskItem.removeChild(editForm);
                // Show the buttons again
                taskItem.appendChild(editButton);
                taskItem.appendChild(deleteButton);
            });

            editForm.appendChild(editTitle);
            editForm.appendChild(editDescription);
            editForm.appendChild(editDate);
            editForm.appendChild(editTime);
            editForm.appendChild(editFiles);
            editForm.appendChild(editDeadline);
            editForm.appendChild(saveButton);
            editForm.appendChild(cancelButton);

            // Remove the buttons while in edit mode
            taskItem.removeChild(editButton);
            taskItem.removeChild(deleteButton);

            taskItem.appendChild(editForm);
        });

        const deleteButton = createButton("Delete", "btn-danger", function () {
            // Remove the task item
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        // Append task item to the list
        taskList.appendChild(taskItem);

        // Clear form fields
        taskForm.reset();
    });

    function createInput(type, id, value, label) {
        const inputDiv = document.createElement("div");
        inputDiv.className = "mb-3";
        const labelElement = document.createElement("label");
        labelElement.setAttribute("for", id);
        labelElement.className = "form-label";
        labelElement.textContent = label;
        inputDiv.appendChild(labelElement);

        const input = document.createElement("input");
        input.type = type;
        input.id = id;
        input.className = "form-control";
        if (value) {
            input.value = value;
        }

        inputDiv.appendChild(input);
        return inputDiv;
    }

    function createButton(text, btnClass, clickHandler) {
        const button = document.createElement("button");
        button.className = `btn ${btnClass} btn-sm me-2`;
        button.textContent = text;
        button.addEventListener("click", clickHandler);
        return button;
    }
});
