function populateTheaters() {
    fetch('https://www.finnkino.fi/xml/TheatreAreas/')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const theaters = Array.from(data.querySelectorAll('TheatreArea'));
            theaters.sort((a, b) => a.querySelector('Name').textContent.localeCompare(b.querySelector('Name').textContent));

            const dropdown = document.getElementById('theater-dropdown');
            dropdown.innerHTML = '<option>Valitse teatteri</option>';
            theaters.forEach(theater => {
                const option = document.createElement('option');
                option.value = theater.querySelector('ID').textContent;
                option.textContent = theater.querySelector('Name').textContent;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Virhe haettaessa teattereita:', error);
            document.getElementById('theater-dropdown').innerHTML = '<option>Teattereiden lataus epäonnistui</option>';
        });
}
function fetchMovies(theaterId) {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const url = `https://www.finnkino.fi/xml/Schedule/?area=${theaterId}&dt=${formattedDate}`;

    fetch(url)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const shows = data.querySelectorAll('Show');
            const movies = [];
            shows.forEach(show => {
                const title = show.querySelector('Title').textContent;
                const originalTitle = show.querySelector('OriginalTitle').textContent;
                const showTime = show.querySelector('dttmShowStart').textContent;
                movies.push({ title, originalTitle, showTime });
            });

            const moviesContainer = document.getElementById('movies-container');
            moviesContainer.innerHTML = '';

            movies.forEach(movie => {
                fetchMovieInfo(movie.originalTitle, moviesContainer, movie.showTime);
            });
        })
        .catch(error => console.error('Virhe haettaessa elokuvia:', error));
}
function displayMovieInfo(movieInfo, container, showTime) {
    const showTimeFormatted = new Date(showTime).toLocaleString('fi-FI', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
        <img src="${movieInfo.Poster}" alt="${movieInfo.Title} juliste">
        <h3>${movieInfo.Title}</h3>
        <p>Näytösaika: ${showTimeFormatted}</p>
        <p>Genre: ${movieInfo.Genre}</p>
        <p>Ohjaaja: ${movieInfo.Director}</p>
        <p>Näyttelijät: ${movieInfo.Actors}</p>
        <p>Kesto: ${movieInfo.Runtime}</p>
        <p>Ikäraja: ${movieInfo.Rated}</p>
        <details>
            <summary>Juoni (Lue klikkaamalla)</summary>
            <p>${movieInfo.Plot}</p>
        </details>
        <button class="add-to-wishlist-button" data-added="false">Lisää toivelistaan</button>
    `;
    container.appendChild(movieElement);

    const wishlistButton = movieElement.querySelector('.add-to-wishlist-button');
    wishlistButton.addEventListener('click', handleWishlistButtonClick);
}
function filterMovies() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const movies = document.querySelectorAll('.movie');
    movies.forEach(movie => {
        const title = movie.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchValue)) {
            movie.style.display = '';
        } else {
            movie.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', populateTheaters);
document.getElementById('theater-dropdown').addEventListener('change', function() {
    const theaterId = this.value;
    if (theaterId) {
        fetchMovies(theaterId);
    }
});
document.getElementById('search-input').addEventListener('input', filterMovies);