var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("theater-dropdown").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
xhttp.send();
