document.querySelector("#okeySign").addEventListener('click', function () {
    /*הכנס פרטי משתמש למשתנים*/
    let name = document.getElementById("nameSign").value;
    let mail = document.getElementById("emailSign").value;
    let password = document.getElementById("passwordSign").value;
    let password2 = document.getElementById("passwordSign2").value;
    const user = {
        name: name,
        mail: mail,
        password: password,
        password2: password2,
    }
    let fxhr = new FXMLHttpRequest();
    fxhr.fData = JSON.stringify(user);
    fxhr.fOpen("POST", "https://www.toDoList/signUp");
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