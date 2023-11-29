function updateMovies(selectedTheater, selectedDate) {
    console.log("Selected Theater: ", selectedTheater);
    console.log("Selected Date:", selectedDate);
    haeElokuvat(selectedTheater, 'selectedDate');

     // Fetch data from the second XML link
    fetch(`https://www.finnkino.fi/xml/ScheduleDates/`)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
    const selectedDate = data.querySelectorAll('selectedDate');

        selectedDate.forEach(selectedDate => {
            const date = selectedDate.innerHTML;
            // Do something with the date, such as displaying it on the web page
            console.log(date);
            for (let i= 0; i<date.length; i++){
                let show= date[i]
            }
    });
});







function haeElokuvat(selectedTheater, selectedDate) {
    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedTheater}&dt=${selectedDate}`)

        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const elokuvat = data.querySelectorAll('Show');

            const movieScheduleDiv= document.getElementById('laatikko');
            movieScheduleDiv.innerHTML= '';
            
        console.log (elokuvat)
            for (let i= 0; i<elokuvat.length; i++){
                let show= elokuvat[i]
            //console.log (show)
            let Title= show.getElementsByTagName('Title')[0].innerHTML
            let Genres= show.getElementsByTagName('Genres') [0].innerHTML
            let EventSmallImagePortrait =show.getElementsByTagName ('EventSmallImagePortrait') [0].innerHTML
            let Name= show.getElementsByTagName ('Name') [0].innerHTML
            let RatingImageUrl = show.getElementsByTagName ('RatingImageUrl') [0].innerHTML
            let showTime = new Date(show.querySelector('dttmShowStart').innerHTML);
            let formattedDateTime = `${showTime.getDate()}.${showTime.getMonth() + 1}. klo ${showTime.getHours()}.${showTime.getMinutes()}`;

            console.log(Title)
            console.log(Genres)
            console.log(formattedDateTime)
            console.log(EventSmallImagePortrait)
            console.log(Name)
            console.log(RatingImageUrl)

            let elokuvaContainer = document.createElement('div');
            elokuvaContainer.classList.add('elokuva-container');
            let html= `
            <img src= "${EventSmallImagePortrait}" alt="${Title}">
            <div class="elokuva-tiedot">
            <h1>${Title}</h1>
            <h2>${Genres}</h2>
            <h2>${formattedDateTime}</h2>
            <h2>${Name}</h2>
            <img src= "${RatingImageUrl}" alt="${Genres}">
        
            </div>`
            console.log(html)
            ; 
    
            elokuvaContainer.innerHTML = html;
            document.querySelector('#laatikko').appendChild(elokuvaContainer);
            movieScheduleDiv.appendChild(elokuvaContainer);
            }
            function toggleWishlist(heartIcon) {
              const title = heartIcon.getAttribute('data-title');
              const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
            
              if (wishlist[title]) {
                delete wishlist[title];
              } else {
                wishlist[title] = true;
              }
            
              localStorage.setItem('wishlist', JSON.stringify(wishlist));
              updateHeartColor(heartIcon, wishlist[title]);
            }
            
            function updateHeartColor(heartIcon, isInWishlist) {
              if (isInWishlist) {
                heartIcon.classList.add('wishlist');
              } else {
                heartIcon.classList.remove('wishlist');
              }
            }
            
            // On page load, check and update the wishlist status for each movie
            document.addEventListener('DOMContentLoaded', function () {
              let wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
          
              const heartIcons = document.querySelectorAll('.wishlist-heart');
          
              heartIcons.forEach((heartIcon) => {
                  const title = heartIcon.getAttribute('data-title');
                  updateHeartColor(heartIcon, wishlist[title]);
              });
          });
          })
      }
  };