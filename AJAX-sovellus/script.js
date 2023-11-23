var url= "https://www.finnkino.fi/xml/TheatreAreas/";
var xmlhttp= new XMLHttpRequest();
var data;
xmlhttp.open("GET",url, true); 
xmlhttp.send();

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.onreadystatechange==4 && xmlhttp.status==200){
        data= xmlhttp.responseXML;
        let alue= data.querySelectorAll('title')
        console.log( alue )
        for (let i=0; i < alue.length; i++)
        let alue = alue[i].childNodes[0].nodeValue + "<br>";

        console.log(alue);
        document.write(alue)
    }
}