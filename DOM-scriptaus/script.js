//Hakee hakukentän ja tehtävien listan elementit HTML-tiedostosta
const inputBox = document.getElementById("hakukentta");
const listContainer = document.getElementById("tehtavat");

function newElement(){
//Virheilmoitus, jos hakukenttä on tyhjä
    if(inputBox.value === ''){
        alert("Kirjoita jotain!");
    }
//Jos hakukenttään syötetty teksti on alle kolme kirjainta ohjelma antaa virheilmoituksen
    else if (inputBox.value.length < 3) {
        alert("Liian lyhyt teksti!");
    }
//Jos syötetty teksti täyttää kriteerit luodaan listaan uusi kohta
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
//Rastimerkin luominen
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
//Tyhjentää hakukentän
    inputBox.value = "";
    saveData();
}
//Funktio näyttää tallennetut listan kohdat
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
//Funktio tallentaa listan kohdat Local Storageen
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

showTask();