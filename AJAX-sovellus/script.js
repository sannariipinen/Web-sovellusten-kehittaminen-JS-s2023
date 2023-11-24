function haeElokuvat() {
    fetch('https://www.finnkino.fi/xml/Schedule/?area=1031&dt=24.11.2023')

        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const elokuvat = (data.querySelectorAll('Show'));
            
        console.log (elokuvat)
            for (let i= 0; i<elokuvat.length; i++){
                let show= elokuvat[i].innerHTML
            console.log (show)
            let Title= show.getElementsByTagName('Title')

            console.log(Title)
            }
        })
        .catch(error => {
            console.error('Virhe haettaessa teattereita:', error);
            document.getElementById('theater-dropdown').innerHTML = '<option>Teattereiden lataus epäonnistui</option>';
        });
    }

