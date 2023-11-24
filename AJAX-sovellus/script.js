// Teatterivalikon näyttäminen
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
//Teatterivalikon alustus
document.addEventListener('DOMContentLoaded', populateTheaters);
//Teatterivalikon muutosten kuuntelija
document.getElementById('theater-dropdown').addEventListener('change', function() {
    const theaterId = this.value;
    if (theaterId) {
        fetchMovies(theaterId);
    }
});
