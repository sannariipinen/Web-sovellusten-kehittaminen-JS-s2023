function haeElokuvat() {
    const dropdown = document.getElementById('theaterdropdown');
    
    // Clear existing options (except the default option)
    dropdown.options.length = 1;

    fetch(`https://www.finnkino.fi/xml/Schedule/`)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const elokuvat = data.querySelectorAll('Show');

            for (let i = 0; i < elokuvat.length; i++) {
                let show = elokuvat[i];
                let Title = show.getElementsByTagName('Title')[0].innerHTML;
                let Genres = show.getElementsByTagName('Genres')[0].innerHTML;
                let EventSmallImagePortrait = show.getElementsByTagName('EventSmallImagePortrait')[0].innerHTML;

                let html = `
                    <h1>${Title}</h1>
                    <h2>${Genres}</h2>
                    <img src="${EventSmallImagePortrait}">
                `;

                document.querySelector('#laatikko').innerHTML += html;
            }

            // Assuming theaters array is defined elsewhere in your code
            theaters.forEach(theater => {
                const option = document.createElement('option');
                option.value = theater.ID; // Assuming ID is a property in your theaters array
                option.textContent = theater.Name; // Assuming Name is a property in your theaters array
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


