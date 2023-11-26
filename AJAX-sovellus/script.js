function updateMovies(selectedTheater) {
   
    console.log("Selected Theater: ", selectedTheater);

    haeElokuvat("selectedTheater", '2023-11-24');

}

function haeElokuvat(selectedMovie) {
    fetch(`https://www.finnkino.fi/xml/Schedule/`)
    

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

            let elokuvaContainer = document.createElement('div');
            elokuvaContainer.classList.add('elokuva-container');
            let html= `
            <img src= "${EventSmallImagePortrait}" alt="${Title}">
            <div class="elokuva-tiedot">
            <h1>${Title}</h1>
            <h2>${Genres}</h2>
            </div>`
            console.log(html)
            ; 
            elokuvaContainer.innerHTML = html;
            document.querySelector('#laatikko').appendChild(elokuvaContainer);
            }
        })
        
}
