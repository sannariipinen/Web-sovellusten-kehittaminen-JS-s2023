//Ladataan sivu, kun DOM on valmis
document.addEventListener('DOMContentLoaded', function () {
  //Haetaan elokuvien näytösajat Finnkinon XML-linkistä
  fetch(`https://www.finnkino.fi/xml/ScheduleDates/`)
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
  
        const today = new Date();
        const todayISO = today.toISOString().split('T')[0];
//lisätään päivämäärä valintaan nykyinen päivä
        const option = document.createElement('option');
        option.value = todayISO;
        option.textContent = today.toLocaleDateString('en-FI', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
        dateDropdown.appendChild(option);
        document.getElementById('dateDropdown').value = todayISO;
//päivitetään elokuvat valitulla teatterilla ja päivämäärällä
        updateMovies(document.getElementById('theaterDropdown').value, todayISO);
        
      })
       
      .catch(error => console.error('Error fetching schedule dates:', error));
});

loadWishlistFromStorage();

//ladataan toivelistan tiedot selaimen muistista
function loadWishlistFromStorage() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
  const wishlistButtons = document.querySelectorAll('.wishlist-button');

  wishlistButtons.forEach(button => {
    const title = button.getAttribute('data-title');
    updateButtonColor(button, wishlist[title]);
  });
}
//päivitetään toivelistaa
function updateWishlistUI() {
    const wishlistContainer = document.getElementById('wishlist-list');
    wishlistContainer.innerHTML = '';

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

    for (const title in wishlist) {
        if (wishlist.hasOwnProperty(title)) {
            const listItem = document.createElement('li');
            listItem.textContent = `• ${title}`;
            wishlistContainer.appendChild(listItem);
        }
    }
}

updateWishlistUI();

// Muokataan funktiota, että ohjelma hakee tietyn teatterin elokuvat
function updateMovies(selectedTheater, selectedDate) {
  console.log("Update Movies - Theater: ", selectedTheater);
  console.log("Update Movies - Date:", selectedDate);

    
  console.log("After Default - Update Movies - Date:", selectedDate);
  haeElokuvat(selectedTheater, selectedDate);
}
// Lisätään tapahtumakuuntelija toivelistan painikkeelle
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
  const movieScheduleDiv = document.getElementById('laatikko');

  movieScheduleDiv.addEventListener('click', function (event) {
      const target = event.target;
      if (target.classList.contains('wishlist-button')) {
          toggleWishlist(target);
      }
  });

//Elokuva lisätään toivelistaan nappia painamalla
function toggleWishlist(button) {
  const title = button.getAttribute('data-title');
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

  if (wishlist[title]) {
      delete wishlist[title];
  } else {
      wishlist[title] = true;
  }
// Tallennetaan toivelistan tiedot selaimen muistiin
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // Päivitetään napin väriä ja toivelistaa
  wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
  console.log('Updated wishlist:', wishlist);
  updateButtonColor(button, wishlist[title]);
  updateWishlistUI();
};

function updateButtonColor(button, title) {
  console.log('Updating button color for:', title);
  const isInWishlist = title === true;

//Lisätään tai poistetaan elokuva toivelistalta
  if (isInWishlist) {
      button.classList.add('wishlist');
  } else {
      button.classList.remove('wishlist');
  }
}

  const wishlistButtons = document.querySelectorAll('.wishlist-button');

  wishlistButtons.forEach(button => {
      const title = button.getAttribute('data-title');
      updateButtonColor(button);
    });
      
//Haetaan elokuvat Finnkinon XML-linkistä
function haeElokuvat(selectedTheater, selectedDate) {
    console.log("Hae Elokuvat - Theater: ", selectedTheater);
    console.log("Hae Elokuvat - Date:", selectedDate);
    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedTheater}&dt=${new Date(selectedDate).toISOString()}`)

        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          console.log('API Response:', data);
          const selectedDateShows = Array.from(data.querySelectorAll('Show')).filter(show => {
            const showDate = show.querySelector('dttmShowStart').innerHTML.split('T')[0];
            return showDate === selectedDate.split('T')[0];
          });
            const movieScheduleDiv= document.getElementById('laatikko');
            movieScheduleDiv.innerHTML= '';

            
        console.log (selectedDateShows);

            for (let i= 0; i< selectedDateShows.length; i++) {
            let show= selectedDateShows[i];
            let showTime = new Date(show.querySelector('dttmShowStart').innerHTML);
            let formattedDateTime = `${showTime.getDate()}.${showTime.getMonth() + 1}. klo ${showTime.getHours()}.${showTime.getMinutes()}`;
            let Title= show.getElementsByTagName('Title')[0].innerHTML;
            let Genres= show.getElementsByTagName('Genres') [0].innerHTML;
            let EventMediumImagePortrait =show.getElementsByTagName ('EventMediumImagePortrait') [0].innerHTML;
            let Name= show.getElementsByTagName ('Name') [0].innerHTML;
            let RatingImageUrl = show.getElementsByTagName ('RatingImageUrl') [0].innerHTML;

            console.log(Title)
            console.log(Genres)
            console.log(formattedDateTime)
            console.log(EventMediumImagePortrait)
            console.log(Name)
            console.log(RatingImageUrl)
 // Luodaan div-elementti, joka sisältää elokuvan tiedot 
            let elokuvaContainer = document.createElement('div');
            elokuvaContainer.classList.add('elokuva-container');
            let html= `
            <img src= "${EventMediumImagePortrait}" alt="${Title}">
            <div class="elokuva-tiedot">
            <h1>${Title}</h1>
            <h2>${Genres}</h2>
            <h2>${formattedDateTime}</h2>
            <h2>${Name}</h2>
            <img src= "${RatingImageUrl}" alt="${Genres}">
            <br>
            <button class="wishlist-button" data-title="${Title}">&#10084; Lisää toivelistalle </button>
        
            </div>`
            console.log(html)
            ; 
    
            elokuvaContainer.innerHTML = html;
            movieScheduleDiv.appendChild(elokuvaContainer);
            }
          }
        )};