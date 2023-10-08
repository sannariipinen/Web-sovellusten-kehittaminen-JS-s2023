const inputBox = document.getElementById("teksti");
const listContainer = document.getElementById("tehtävät");

function addTask(){
    if(inputBox.value === ''){
        alert("Kirjoita jotain!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    inputBox.value ="";
}
