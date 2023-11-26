// script.js

// Array to store people for each issue
let peopleList = [];

// Function to add a person to the list
function addPerson() {
    const personName = document.getElementById('personName').value;
    const personPosition = document.getElementById('personPosition').value;

    if (personName && personPosition) {
        const person = {
            name: personName,
            position: personPosition
        };

        // Add the person to the list
        peopleList.push(person);

        // Display the updated people list
        displayPeopleList();

        // Clear the input fields
        document.getElementById('personName').value = '';
        document.getElementById('personPosition').value = '';
    }
}

// Function to display people list
function displayPeopleList() {
    const peopleListContainer = document.getElementById('peopleList');
    peopleListContainer.innerHTML = '<strong>People:</strong><br>';

    // Loop through people and display them
    peopleList.forEach(person => {
        peopleListContainer.innerHTML += `${person.name} - ${person.position}<br>`;
    })
}

// Array to store issues
let issues = [];

// Function to create an issue
function createIssue() {
    // Get form values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const requirements = document.getElementById('requirements').value;
    const priority = document.getElementById('priority').value;
    const deadline = document.getElementById('deadline').value;

    // Check if all required fields are filled
    // if (!title || !description || !category || !requirements || !priority || !people || !deadline) {
    //     alert("Please fill in all fields.");
    //     return;
    // }

    // Create unique ID for the issue
    const issueId = Date.now().toString();

    // Create issue object
    const issue = {
        id: issueId,
        title: title,
        description: description,
        category: category,
        requirements: requirements,
        priority: priority,
        people: [...peopleList], // Clone the people list
        deadline: deadline,
        status: 'Open' // Initial status
    };

     // Add the issue to the array
     issues.push(issue);

     // Clear the form and people list
     document.getElementById('issueForm').reset();
     
     // Explicitly clear the people list
     peopleList = [];
 
     // Clear the people list display
     displayPeopleList();
 
     // Display the updated issue list
     displayIssues();
}

// Function to display issues
function displayIssues() {
    const issueListContainer = document.getElementById('issueList');
    issueListContainer.innerHTML = '';

    // Loop through issues and create HTML elements
    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.className = 'card mb-3';
        issueCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${issue.title} - Issue #${issue.id}</h5>
                <p class="card-text"><strong>Description:</strong> ${issue.description}</p>
                <p class="card-text"><strong>Category:</strong> ${issue.category}</p>
                <p class="card-text"><strong>Requirements:</strong> ${issue.requirements}</p>
                <p class="card-text"><strong>Priority:</strong> ${issue.priority}</p>
                <p class="card-text"><strong>People:</strong> ${issue.people.map(person => `${person.name} - ${person.position}`).join(', ')}</p>
                <p class="card-text"><strong>Deadline:</strong> ${issue.deadline}</p>
                <p class="card-text"><strong>Status:</strong> ${issue.status}</p>
                <button class="btn btn-secondary" onclick="editIssue('${issue.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteIssue('${issue.id}')">Delete</button>
                <div id="editForm_${issue.id}"></div>
            </div>
            <hr>
        `;

        issueListContainer.appendChild(issueCard);
    });
}
// Function to edit an issue
function editIssue(issueId) {
    const issue = issues.find(issue => issue.id === issueId);

    // Display the edit form underneath the edit button
    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <label for="editTitle" class="form-label">Title</label>
        <input type="text" class="form-control" id="editTitle" value="${issue.title}" required>
        
        <label for="editDescription" class="form-label">Description</label>
        <textarea class="form-control" id="editDescription" rows="3" required>${issue.description}</textarea>

        <label for="editCategory" class="form-label">Category</label>
        <select class="form-select" id="editCategory" required>
            <option value="bug" ${issue.category === 'bug' ? 'selected' : ''}>Bug</option>
            <option value="feature" ${issue.category === 'feature' ? 'selected' : ''}>Feature</option>
            <option value="enhancement" ${issue.category === 'enhancement' ? 'selected' : ''}>Enhancement</option>
        </select>

        <label for="editRequirements" class="form-label">Requirements</label>
        <input type="text" class="form-control" id="editRequirements" value="${issue.requirements}" required>

        <label for="editPriority" class="form-label">Priority</label>
        <select class="form-select" id="editPriority" required>
            <option value="low" ${issue.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${issue.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${issue.priority === 'high' ? 'selected' : ''}>High</option>
        </select>

        <label for="editPeople" class="form-label">People to work on it</label>
        <input type="text" class="form-control" id="editPeople" value="${issue.people.map(person => `${person.name} - ${person.position}`).join(', ')}" required>

        <label for="editDeadline" class="form-label">Deadline</label>
        <input type="date" class="form-control" id="editDeadline" value="${issue.deadline}" required>

        <button class="btn btn-primary" onclick="saveEdit('${issue.id}')">Save</button>
        <button class="btn btn-secondary" onclick="cancelEdit()">Cancel</button>
    `;
    document.getElementById(`editForm_${issue.id}`).appendChild(editForm);
}

// Function to save edited issue
function saveEdit(issueId) {
    const issue = issues.find(issue => issue.id === issueId);

    // Update issue details if user doesn't cancel
    issue.title = document.getElementById('editTitle').value;
    issue.description = document.getElementById('editDescription').value;
    issue.category = document.getElementById('editCategory').value;
    issue.requirements = document.getElementById('editRequirements').value;
    issue.priority = document.getElementById('editPriority').value;

    // Update people list
    const editedPeople = document.getElementById('editPeople').value;
    issue.people = editedPeople.split(',').map(person => {
        const [name, position] = person.trim().split(' - ');
        return { name, position };
    });

    issue.deadline = document.getElementById('editDeadline').value;

    // Remove the edit form
    document.getElementById(`editForm_${issue.id}`).innerHTML = '';

    // Display the updated issue list
    displayIssues();
}

// Function to cancel editing
function cancelEdit() {
    const issueId = document.querySelector('[id^="editForm_"]').id.replace('editForm_', '');
    // Remove the edit form
    document.getElementById(`editForm_${issueId}`).innerHTML = '';
}




// Function to delete an issue
function deleteIssue(issueId) {
    // Remove the issue from the array
    issues = issues.filter(issue => issue.id !== issueId);

    // Display the updated issue list
    displayIssues();
}

// Initial display of issues
displayIssues();
