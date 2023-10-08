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
    saveData()
}

listContainer.addEventListener("click", function(e)){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("tehty");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();