class Menu {
    constructor(template){
        for(let [key, value] of Object.entries(template)){
            this[key] = value;
        }
        this.renderHTML()
    }
    renderHTML(){
        const navElem = document.querySelector('nav');

        navElem.innerHTML = `<ul id="menu">`;
        for(let key of Object.keys(this)) {
            navElem.innerHTML += `<li id="${key.toLowerCase()}">${key}</li>`;
        }
        navElem.innerHTML += `</ul>`;
    }
}