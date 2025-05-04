function sendFXMLHttpRequest(fxhr) {
    if (fxhr.fMethod == "GET" && fxhr.fUrl.match("logIn")) {
        logIn(fxhr);
    } else if (fxhr.fMethod == "GET" && fxhr.fUrl.match("listOfTasks")) {
        getTasks(fxhr);
    } else if (fxhr.fMethod == "GET" && fxhr.fUrl.match("listOfImportantTasks")) {
        getImportantTasks(fxhr);
    } else if (fxhr.fMethod == "GET" && fxhr.fUrl.match(`detailsTask/${fxhr.fData}`)) {
        getDetailsOfTask(fxhr);
    } else if (fxhr.fMethod == "POST" && fxhr.fUrl.match("signUp")) {
        saveUser(fxhr);
    } else if (fxhr.fMethod == "POST" && fxhr.fUrl.match("addTask")) {
        addTask(fxhr);
    } else if (fxhr.fMethod == "DELETE" && fxhr.fUrl.match("deleteTask")) {
        deleteMyTask(fxhr);
    } else if (fxhr.fMethod == "DELETE" && fxhr.fUrl.match("deleteImportantTask")) {
        deleteMyImportantTask(fxhr);
    } else if (fxhr.fMethod == "PUT" && fxhr.fUrl.match("importantTask")) {
        updateArrayImportantTasks(fxhr);
    }
}
function saveUser(fxhr) {
    let user = JSON.parse(fxhr.fData);
    /*אם לא מולאו כל הפרטים*/
    if (user.mail == "" || user.name == "" || user.password == "" || user.password2 == "") {
        fxhr.fStatusText = "Client error. You must fill all the details";
        fxhr.fStatus = 418;
    } else if (user.password != user.password2 || !saveUserInDataBase(user.name, user.mail, user.password)) {
        fxhr.fStatusText = "Client error. Some of the detail are wrong";
        fxhr.fStatus = 418;
    } else if (!ValidateEmail(user.mail)) {
        fxhr.fStatusText = "You have entered an invalid email address!";
        fxhr.fStatus = 418;
    } else if (!CheckPassword(user.password)) {
        fxhr.fStatusText = "Wrong password...! The password must contain letters and numbers";
        fxhr.fStatus = 418;
    } else {
        fxhr.fStatusText = "The request successed";
        fxhr.fStatus = 200;
    }
    netWorkServerToClient(fxhr);
}

function logIn(fxhr) {
    let user = JSON.parse(fxhr.fData);
    /*אם לא מולאו כל הפרטים*/
    if (user.mail == "" || user.password == "") {
        fxhr.fStatusText = "Client error. You must fill all the details";
        fxhr.fStatus = 418;
    } else if (!ValidateEmail(user.mail) || !userExist(user.mail, user.password)) {
        fxhr.fStatusText = "Client error. Some of the detail are wrong";
        fxhr.fStatus = 418;
    } else if (userExist(user.mail, user.password)) {
        fxhr.fStatusText = "The request successed";
        fxhr.fStatus = 200;
    }
    netWorkServerToClient(fxhr);
}

function ValidateEmail(mailAdress) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailAdress.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function CheckPassword(password) {
    let passw = /^[A-Za-z]\w{7,14}$/;
    return (password.match(passw));
}

function getTasks(fxhr) {
    let currentUser =fxhr.fHeaders;
    let arrTasks = getTasksFromDataBase(currentUser);
    if (arrTasks) {
        fxhr.fStatus = 200;
        fxhr.fStatusText = "The request successed";
        fxhr.fData = arrTasks;
    } else {
        fxhr.fStatus = 418;
        fxhr.fStatusText = "You have no tasks yet";
    }
    netWorkServerToClient(fxhr);
}

function addTask(fxhr) {
    if (updateUserTasksInDataBase(JSON.parse(fxhr.fData), fxhr.fHeaders)) {
        fxhr.fStatus = 200;
        fxhr.fStatusText = "The request successed";
    } else {
        fxhr.fStatus = 418;
        fxhr.fStatusText = "The request isn't successed";
    }
    netWorkServerToClient(fxhr);
}

function deleteMyTask(fxhr) {
    if (deleteUserTaskFromDataBase(fxhr.fData, fxhr.fHeaders)) {
        fxhr.fStatus = 200;
        fxhr.fStatusText = "The request successed";
    } else {
        fxhr.fStatus = 418;
        fxhr.fStatusText = "The request isn't successed";
    }
    netWorkServerToClient(fxhr);
}

function updateArrayImportantTasks(fxhr) {
    if (updateTasksToImportant(fxhr.fData, fxhr.fHeaders)) {
        fxhr.fStatus = 200;
        fxhr.fStatusText = "The request successed";
    } else {
        fxhr.fStatus = 418;
        fxhr.fStatusText = "The request isn't successed";
    }
    netWorkServerToClient(fxhr);
}

function getImportantTasks(fxhr) {
    let arrImportantTasks = getImportantTasksFromDataBase(fxhr.fHeaders);
    if (arrImportantTasks) {
        fxhr.fStatus = 200;
        fxhr.fStatusText = "The request successed";
        fxhr.fData = arrImportantTasks;
    } else {
        fxhr.fStatus = 418;
        fxhr.fStatusText = "The request did not success";
    }
    netWorkServerToClient(fxhr);
}

function deleteMyImportantTask(fxhr) {
    if (deleteImportantTaskFromDataBase(fxhr.fData, fxhr.fHeaders)) {
        fxhr.fStatus = 200;
        fxhr.fStatusText = "The request successed";
    } else {
        fxhr.fStatus = 418;
        fxhr.fStatusText = "The request isn't successed";
    }
    netWorkServerToClient(fxhr);
}

function getDetailsOfTask(fxhr) {
    let task = getDetailsTaskFromDataBase(fxhr.fData, fxhr.fHeaders);
    if (task) {
        fxhr.fStatus = 200;
        fxhr.fStatusText = "The request successed";
        fxhr.fData = JSON.stringify(task);
    } else {
        fxhr.fStatus = 418;
        fxhr.fStatusText = "The request did not success";
    }
    netWorkServerToClient(fxhr);
}

