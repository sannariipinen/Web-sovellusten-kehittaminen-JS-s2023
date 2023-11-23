function populateTheaters() {
    fetch('https://www.finnkino.fi/xml/TheatreAreas/')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
        const theaters = Array.from(data.querySelectorAll('TheatreArea'));
        // Lajittele teatterit aakkosjärjestyksessä
        theaters.sort((a, b) => a.querySelector('Name').textContent.localeCompare(b.querySelector('Name').textContent));

        const dropdown = document.getElementById('theater-dropdown');
        dropdown.innerHTML = '<option>Valitse teatteri</option>'; // Menun Oletusvalinta
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
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
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