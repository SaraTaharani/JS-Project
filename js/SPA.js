document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('popstate', poppin);
    if(location.hash==="")
    {
        history.replaceState({}, 'signUp', '#signUp')
    }
    poppin();
});

//פעולה מול הדפדפן

function poppin(ev) {
    let hash = location.hash.replace('#', '');
    let hashTemplate = document.getElementById(hash);
    let clonTemplate = hashTemplate.content.cloneNode(true);
    document.querySelector('main').replaceChildren(clonTemplate);
}