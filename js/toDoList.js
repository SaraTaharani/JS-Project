document.getElementById("btnAddTask").addEventListener('click', newTask);
document.getElementById("signOut").addEventListener('click', signOut);
document.getElementById("myTasks").addEventListener('click', showMyTasks);
document.getElementById("importantTasks").addEventListener('click', showMyImportantTasks);


function signOut() {
    history.replaceState({}, 'signUp', '#signUp')
    poppin();
    localStorage.setItem('currentUser', "");
}

function newTask() {
    let textTask = document.getElementById("textTask").value;  //title
    let deadLine = document.getElementById("dateTask").value;  //deadline
    let notesOfTask = document.getElementById("notesOfTask").value;  //notes
    const task = {
        ID: "",
        textContent: textTask,
        deadLine: deadLine,
        notesOfTask: notesOfTask,
    }
    const fxhr = new FXMLHttpRequest();
    let currentUserMail = localStorage.getItem('currentUser');
    fxhr.fHeaders=currentUserMail;
    fxhr.fData = JSON.stringify(task);
    fxhr.fOpen("POST", "https://www.toDoList/addTask");
    fxhr.addEventListener('load', () => {
        try {
            if (fxhr.fStatus >= 200 && fxhr.fStatus < 299) { //success
                showMyTasks();
            } else {
                throw fxhr.fStatusText;
            }
        }
        catch (error) {
            alert("an error occured");
        }
    });
    fxhr.fSend();
    document.getElementById("textTask").value = "";      //איפוס
    document.getElementById("dateTask").value = "";
    document.getElementById("notesOfTask").value = "";
}

function showMyTasks() {
    closeDetailsTask();
    const fxhr = new FXMLHttpRequest();
    fxhr.fOpen("GET", "https://www.toDoList/listOfTasks");
    let currentUserMail = localStorage.getItem('currentUser');
    fxhr.fHeaders=currentUserMail;
    fxhr.addEventListener('load', () => {
        try {
            if (fxhr.fStatus >= 200 && fxhr.fStatus < 299) { //success
                tasks(fxhr.fData);
            } else {
                throw fxhr.fStatusText;
            }
        }
        catch (error) {
            alert("an error occured");
        }
    });
    fxhr.fSend();
}

function getCurrentDateDisplay() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    return currentDate;
}

function tasks(arrTasks) {
    let container = document.getElementById('container');
    container.innerHTML = "";
    container.insertAdjacentHTML('beforeend', `<h2 class='titleClass'>My Tasks</h2><h2 id='dateTitle'>${getCurrentDateDisplay()}</h2>`);
    for (let i = arrTasks.length - 1; i >= 0; i--) {
        container.insertAdjacentHTML('beforeend',
            `<span class="spanClass" id="task-${arrTasks[i].ID}"><label class = 'textTask'>` + arrTasks[i].textContent +
            `<button id="btnDelete-${arrTasks[i].ID}" class="btnDelete"></button>
            <button id="btnImportant-${arrTasks[i].ID}" class="btnImportant"></button></span>
            <br>`);
        document.getElementById(`btnDelete-${arrTasks[i].ID}`).addEventListener('click', deleteTask);
        document.getElementById(`btnImportant-${arrTasks[i].ID}`).addEventListener('click', importantTask);
        document.getElementById(`task-${arrTasks[i].ID}`).addEventListener('click', showTaskDetails);
    }
}

function deleteTask(e) {
    closeDetailsTask();
    const fxhr = new FXMLHttpRequest();
    fxhr.fOpen("DELETE", "https://www.toDoList/deleteTask");
    let currentUserMail = localStorage.getItem('currentUser');
    fxhr.fHeaders=currentUserMail;
    fxhr.fData = e.target.id[(e.target.id.lastIndexOf("-")) + 1];
    fxhr.addEventListener('load', () => {
        try {
            if (fxhr.fStatus >= 200 && fxhr.fStatus < 299) { //success
                showMyTasks();
            } else {
                throw fxhr.fStatusText;
            }
        }
        catch (error) {
            alert("an error occured");
        }
    });
    fxhr.fSend();
}

function importantTask(e) {
    const fxhr = new FXMLHttpRequest();
    fxhr.fOpen("PUT", "https://www.toDoList/importantTask");
    fxhr.fData = e.target.id[(e.target.id.lastIndexOf("-")) + 1];
    let currentUserMail = localStorage.getItem('currentUser');
    fxhr.fHeaders=currentUserMail;
    fxhr.fSend();
}

function showMyImportantTasks() {
    closeDetailsTask();
    const fxhr = new FXMLHttpRequest();
    fxhr.fOpen("GET", "https://www.toDoList/listOfImportantTasks");
    let currentUserMail = localStorage.getItem('currentUser');
    fxhr.fHeaders=currentUserMail;
    fxhr.addEventListener('load', () => {
        try {
            if (fxhr.fStatus >= 200 && fxhr.fStatus < 299) { //success
                importanTasks(fxhr.fData);
            } else {
                throw fxhr.fStatusText;
            }
        }
        catch (error) {
            alert("an error occured");
        }

    });
    fxhr.fSend();
}

function importanTasks(arrImportantTasks) {
    let container = document.getElementById('container');
    container.innerHTML = "";
    container.insertAdjacentHTML('beforeend', `<h2 class='titleClass'>Important Tasks</h2><h2 id='dateTitle'>${getCurrentDateDisplay()}</h2>`);
    for (let i = arrImportantTasks.length - 1; i >= 0; i--) {
        container.insertAdjacentHTML('beforeend',
            `<span id="task-${arrImportantTasks[i].ID}"><label class = 'textTask'>` + arrImportantTasks[i].textContent +
            `<button id="btnImportant-${arrImportantTasks[i].ID}" class="btnImportant"></button></span>
            <br>`);
        document.getElementById(`btnImportant-${arrImportantTasks[i].ID}`).addEventListener('click', deleteImportantTask);
        document.getElementById(`task-${arrImportantTasks[i].ID}`).addEventListener('click', showTaskDetails);
    }
}

function deleteImportantTask(e) {
    closeDetailsTask();
    const fxhr = new FXMLHttpRequest();
    fxhr.fOpen("DELETE", "https://www.toDoList/deleteImportantTask");
    fxhr.fData = e.target.id[(e.target.id.lastIndexOf("-")) + 1];
    let currentUserMail = localStorage.getItem('currentUser');
    fxhr.fHeaders=currentUserMail;
    fxhr.addEventListener('load', () => {
        try {
            if (fxhr.fStatus >= 200 && fxhr.fStatus < 299) { //success
                showMyImportantTasks();
            } else {
                throw fxhr.fStatusText;
            }
        }
        catch (error) {
            alert("an error occured");
        }
    });
    fxhr.fSend();
}

function showTaskDetails(e) {
    if (e.target.tagName == "SPAN") {
        const fxhr = new FXMLHttpRequest();
        taskID = e.target.id[(e.target.id.lastIndexOf("-")) + 1];
        fxhr.fOpen("GET", `https://www.toDoList/detailsTask/${taskID}`);
        fxhr.fData = taskID;
        let currentUserMail = localStorage.getItem('currentUser');
        fxhr.fHeaders=currentUserMail;
        fxhr.addEventListener('load', () => {
            try{
                if (fxhr.fStatus >= 200 && fxhr.fStatus < 299) { //success
                detailsTask(JSON.parse(fxhr.fData));
            } else {
                throw fxhr.fStatusText;
            }
            }
            catch (error) {
                alert("an error occured");
            }
            
        });
        fxhr.fSend();
    }
}

function detailsTask(task) {
    let detailsOfTaskDiv = document.getElementById('detailsOfTask');
    detailsOfTaskDiv.innerHTML = "";
    detailsOfTaskDiv.innerHTML = ` <a id="xButton">&#x274c;</a> <h3 class = 'formTitles'>Task details</h3>
    <h4 class = 'formTitles'>Title:</h4>
    <label class = 'formTitles'>` + task.textContent + `</label>
    <h4 class = 'formTitles'>DeadLine:</h4>
    <label class = 'formTitles'>` + task.deadLine + `</label>
    <h4 class = 'formTitles'>Notes:</h4>
    <label class = 'formTitles'>` + task.notesOfTask + `</label>`;
    detailsOfTaskDiv.style.display = "block";
    document.getElementById("xButton").addEventListener('click', closeDetailsTask);
}

function closeDetailsTask() {
    document.getElementById('detailsOfTask').style.display = "none";
}