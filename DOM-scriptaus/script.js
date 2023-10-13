//Hakee hakukentän ja tehtävien listan elementit HTML-tiedostosta
const inputBox = document.getElementById("hakukentta");
const listContainer = document.getElementById("tehtavat");

//Napin painaminen + virheilmoitus, jos hakukenttä on tyhjä
function newElement(){
    if(inputBox.value === ''){
        alert("Kirjoita jotain!");
    }
//Jos hakukenttään syötetty teksti on alle kolme kirjainta ohjelma antaa virheilmoituksen
    else if (inputBox.value.length < 3) {
        alert("Liian lyhyt teksti!");
    }
//Jos teksti täyttää kriteerit, nappia painamalla luot uuden kohdan listaan
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
//Tyhjentää hakukentän
    inputBox.value = "";
    saveData();
}
//Funktio näyttää tallennetut tehtävät
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
//Toimintojen seuraaminen
listContainer.addEventListener("click", function(e){
//Merkitsee tehtävän tehdyksi/tekemättömäksi
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
//Poistaa tehtävän, jos raksia klikataan
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);
//Funktio tallentaa tehtävät Local Storageen
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

showTask();