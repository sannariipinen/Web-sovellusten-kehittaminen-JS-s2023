const inputBox = document.getElementById("hakukentta");
const listContainer = document.getElementById("tehtavat");

//Napin painaminen + virheilmoitus, jos hakukenttä on tyhjä
function newElement(){
    if(inputBox.value === ''){
        alert("Kirjoita jotain!");
    }
    //Jos kenttässä on tekstiä, nappia painamalla luot uuden kohdan listaan
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    //saveData() komento tallentaa datan niin, että se pysyy sellaisenaan vaikka sulkisitkin to do -listan
    inputBox.value = "";
    saveData();
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

showTask();