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
        // Näytä käyttäjäystävällinen virheilmoitus
        document.getElementById('theater-dropdown').innerHTML = '<option>Teattereiden lataus epäonnistui</option>';
    });
}