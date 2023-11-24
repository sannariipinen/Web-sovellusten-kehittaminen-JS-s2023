function updateMovies(selectedTheater) {
    // You can use the selectedTheater value to make specific API requests
    // For now, let's just log the selected theater for testing
    console.log("Selected Theater: ", selectedTheater);
}

function haeElokuvat(selectedMovie, date) {
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
