document.addEventListener('DOMContentLoaded', function () {
  const theaterDropdown = document.getElementById('theaterDropdown');
  const dateDropdown = document.getElementById('dateDropdown');

  // Event listener for theater dropdown changes
  theaterDropdown.addEventListener('change', function () {
      const selectedTheater = theaterDropdown.value;
      updateMovies(selectedTheater, null);
      loadDates(selectedTheater);
  });

  // Load dates for the default theater
  loadDates(theaterDropdown.value);
  loadWishlistFromStorage();
});

function loadDates(selectedTheater) {
  fetch(`https://www.finnkino.fi/xml/ScheduleDates/?area=${selectedTheater}`)
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
          const dateDropdown = document.getElementById('dateDropdown');
          const today = new Date();
          const todayISO = today.toISOString().split('T')[0];

          // Clear existing options
          dateDropdown.innerHTML = '<option>Valitse päivämäärä</option>';

          // Get all dates from the XML
          const dates = Array.from(data.querySelectorAll('dateTime'));

          // Filter dates to keep only the ones for the current day
          const currentDayDates = dates.filter(date => {
              return date.innerHTML.split('T')[0] === todayISO;
          });

          // Populate the date dropdown with available dates for the current day
          currentDayDates.forEach(date => {
              const option = document.createElement('option');
              option.value = date.innerHTML;
              option.textContent = new Date(date.innerHTML).toLocaleDateString('en-FI', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
              dateDropdown.appendChild(option);
          });

          // Set the selected date to today
          dateDropdown.value = todayISO;
      })
      .catch(error => console.error('Error fetching schedule dates:', error));
}

loadWishlistFromStorage();

function loadWishlistFromStorage() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
  const wishlistButtons = document.querySelectorAll('.wishlist-button');

  wishlistButtons.forEach(button => {
    const title = button.getAttribute('data-title');
    updateButtonColor(button, wishlist[title]);
  });
}

function updateWishlistUI() {
    const wishlistContainer = document.getElementById('wishlist-list');
    wishlistContainer.innerHTML = '';

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

    for (const title in wishlist) {
        if (wishlist.hasOwnProperty(title)) {
            const listItem = document.createElement('li');
            listItem.textContent = title;
            wishlistContainer.appendChild(listItem);
        }
    }
}

updateWishlistUI();

// Modify updateMovies function to default to tomorrow's date
function updateMovies(selectedTheater, selectedDate) {
  console.log("Update Movies - Theater: ", selectedTheater);
  console.log("Update Movies - Date:", selectedDate);


  if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      selectedDate = tomorrow.toISOString().split('T')[0];
      document.getElementById('dateDropdown').value = selectedDate;
      
  }


  console.log("After Default - Update Movies - Date:", selectedDate);
  haeElokuvat(selectedTheater, selectedDate);
}
document.addEventListener('DOMContentLoaded', function () {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
  const movieScheduleDiv = document.getElementById('laatikko');

  // Event listener for all buttons inside the movie container
  movieScheduleDiv.addEventListener('click', function (event) {
      const target = event.target;

      // Check if the clicked element is a button with the 'wishlist-button' class
      if (target.classList.contains('wishlist-button')) {
          toggleWishlist(target);
      }
  });
});

function toggleWishlist(button) {
  const title = button.getAttribute('data-title');
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

  if (wishlist[title]) {
      delete wishlist[title];
  } else {
      wishlist[title] = true;
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // Update the variable after setting it in local storage
  wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

  console.log('Updated wishlist:', wishlist);
  updateButtonColor(button, wishlist[title]);
  updateWishlistUI(); // Päivitä wishlistin näyttö
};

function updateButtonColor(button, title) {
  console.log('Updating button color for:', title);
  const isInWishlist = title === true;
  if (isInWishlist) {
      button.classList.add('wishlist');
  } else {
      button.classList.remove('wishlist');
  }
}

const wishlistButtons = document.querySelectorAll('.wishlist-button');


document.addEventListener('DOMContentLoaded', function () {
  const wishlistButtons = document.querySelectorAll('.wishlist-button');

  wishlistButtons.forEach(button => {
      const title = button.getAttribute('data-title');
      updateButtonColor(button);
    });
  });      

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
            let EventSmallImagePortrait =show.getElementsByTagName ('EventSmallImagePortrait') [0].innerHTML;
            let Name= show.getElementsByTagName ('Name') [0].innerHTML;
            let RatingImageUrl = show.getElementsByTagName ('RatingImageUrl') [0].innerHTML;

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
            <button class="wishlist-button" data-title="${Title}">&#10084; Lisää toivelistalle </button>
        
            </div>`
            console.log(html)
            ; 
    
            elokuvaContainer.innerHTML = html;
            movieScheduleDiv.appendChild(elokuvaContainer);
            }
          }
        )};