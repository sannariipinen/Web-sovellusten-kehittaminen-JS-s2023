// dateHandler.js
function updateDates(selectedTheater, selectedDate) {
    fetchAvailableDates(selectedTheater, selectedDate)
        .then(dates => {
            populateDateDropdown(dates);
            document.getElementById('dateSelect').value = selectedDate;
            updateMovies(selectedTheater, selectedDate);
        })
        .catch(error => console.error('Error updating dates:', error));
}

function fetchAvailableDates(selectedTheater, selectedDate) {
    return fetch(`https://www.finnkino.fi/xml/ScheduleDates/?area=${selectedTheater}&dt=${selectedDate}`)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const availableDates = Array.from(data.querySelectorAll('dateTime')).map(date => date.innerHTML);
            return availableDates;
        });
}

function populateDateDropdown(dates) {
    const dateSelect = document.getElementById('dateSelect');
    dateSelect.innerHTML = '';

    dates.forEach(dateTime => {
        const option = document.createElement('option');
        option.value = dateTime;
        option.textContent = new Date(dateTime).toLocaleDateString('en-FI', { day: 'numeric', month: 'numeric', year: 'numeric' });
        dateSelect.appendChild(option);
    });
}

