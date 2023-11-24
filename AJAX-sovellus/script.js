function haeTeatterit() {
    fetch('https://www.finnkino.fi/xml/TheatreAreas/')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const teatterit = data.querySelectorAll('TheatreArea');

            for (let i = 0; i < teatterit.length; i++) {
                let teatteri = teatterit[i];
                let teatteriNimi = teatteri.getElementsByTagName('Name')[0].innerHTML;
                let teatteriId = teatteri.getElementsByTagName('ID')[0].innerHTML;

                let html = `
                    <option value="${teatteriId}">${teatteriNimi}</option>
                `;
                
                document.querySelector('haeTeatterit').innerHTML += html
            }

            // Voit kutsua tässä haeElokuvat()-funktiota tai muuta tarvittavaa
        })
        
}

// Kutsu haeTeatterit()-funktiota tarpeen mukaan
haeTeatterit();

function haeElokuvat(areaID) {
    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${areaID}`)


        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const elokuvat = data.querySelectorAll('Show');
            
        console.log (elokuvat)
            for (let i= 0; i<elokuvat.length; i++){
                let show= elokuvat[i]
            //console.log (show)
            let Title= show.getElementsByTagName('Title')[0].innerHTML
            let Genres= show.getElementsByTagName('Genres') [0].innerHTML
            let EventSmallImagePortrait =show.getElementsByTagName ('EventSmallImagePortrait') [0].innerHTML
            console.log(Title)
            console.log(Genres)
            console.log(EventSmallImagePortrait)
            let html= `
            <h1>${Title}</h1>
            <h2>${Genres}</h2>
            <img src= "${EventSmallImagePortrait}">  `
            console.log(html)
            ; 
            document.querySelector('#laatikko').innerHTML+= html
            }
        })
       
    }

