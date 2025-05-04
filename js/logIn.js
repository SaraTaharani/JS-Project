document.querySelector("#okeyLog").addEventListener('click', function () {
    let mail = document.getElementById("emailLog").value;
    let password = document.getElementById("passwordLog").value;
    const user = {
        mail: mail,
        password: password,
    }
    const fxhr = new FXMLHttpRequest();
    fxhr.fData = JSON.stringify(user);
    fxhr.fOpen("GET", "https://www.toDoList/logIn");
    fxhr.addEventListener('load', () => {
        try {
            if (fxhr.fStatus >= 200 && fxhr.fStatus < 299) { //success
                {
                    localStorage.setItem("currentUser", user.mail);
                    history.pushState({}, 'ToDoList', '#toDoList')
                    poppin();
                }
            } else {
                throw fxhr.fStatusText;
            }
        }
        catch (error) {
            alert(error);
        }
    });
    fxhr.fSend();
});