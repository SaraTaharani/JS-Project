document.addEventListener("DOMContentLoaded", () => {
        let current = localStorage.getItem('currentUser');
        let user = JSON.parse(localStorage.getItem(current));
        document.getElementById("winner").textContent = '  ' + user.userName + ' you are the winner🏆';
});