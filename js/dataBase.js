function userExist(mail, password) {
    let userData = JSON.parse(localStorage.getItem(mail));
    if (userData) {
        if (userData.password === password) {
            return true;
        }
        return false;
    }
}

function saveUserInDataBase(name, mail, password) {
    let userData = JSON.parse(localStorage.getItem(mail));
    if (userData) {
        return false;
    }
    const user = {
        name: name,
        mail: mail,
        password: password,
        tasks: [],
        importantTasks: [],
    }
    // "DataBase" הוספת משתמש ל 
    localStorage.setItem(mail, JSON.stringify(user));
    return true;
}

function getTasksFromDataBase(mail) {
    let userData = JSON.parse(localStorage.getItem(mail));
    class newTask {
        constructor() {
            this.ID = "";
            this.textContent = "";
        }
    }
    let newArrTask = [];
    for (let i = 0; i < userData.tasks.length; i++) {
        let task = new newTask();
        task.ID = userData.tasks[i].ID;
        task.textContent = userData.tasks[i].textContent;
        newArrTask.push(task);
    }
    return newArrTask;
}

function updateUserTasksInDataBase(task, mail) {
    let user = JSON.parse(localStorage.getItem(mail));
    task.ID = user.tasks.length + 1;
    user.tasks.push(task);
    localStorage.setItem(user.mail, JSON.stringify(user));
    return true;
}

function deleteUserTaskFromDataBase(taskID, mail) {
    let user = JSON.parse(localStorage.getItem(mail));
    let arrTasks = user.tasks.filter((task) => { return task.ID != taskID; });
    for(let i=taskID-1;i<arrTasks.length;i++)
    {
        arrTasks[i].ID=i+1;
    }
    user.tasks = arrTasks;
    let arrImportantTasks = user.importantTasks.filter((task) => { return task.ID != taskID; });
    user.importantTasks = arrImportantTasks;
    localStorage.setItem(user.mail, JSON.stringify(user));
    return true;
}

function updateTasksToImportant(taskID, mail) {
    let user = JSON.parse(localStorage.getItem(mail));
    let task = user.tasks[taskID - 1];
    user.importantTasks.push(task);
    localStorage.setItem(user.mail, JSON.stringify(user));
    return true;
}

function getImportantTasksFromDataBase(mail) {
    let userData = JSON.parse(localStorage.getItem(mail));
    return userData.importantTasks;
}

function deleteImportantTaskFromDataBase(taskID, mail) {
    let user = JSON.parse(localStorage.getItem(mail));
    let arrImportantTasks = user.importantTasks.filter((task) => { return task.ID != taskID; });
    user.importantTasks = arrImportantTasks;
    localStorage.setItem(user.mail, JSON.stringify(user));
    return true;
}

function getDetailsTaskFromDataBase(taskID, mail) {
    let user = JSON.parse(localStorage.getItem(mail));
    for (let i = 0; i < user.tasks.length; i++) {
        if (user.tasks[i].ID == taskID) {
            return user.tasks[i];
        }
    }
}