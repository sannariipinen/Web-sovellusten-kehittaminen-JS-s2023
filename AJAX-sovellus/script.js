document.addEventListener("DOMContentLoaded", function () {
    var url = "https://www.finnkino.fi/xml/TheatreAreas/";
    var xmlhttp = new XMLHttpRequest();
    var data;

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = xmlhttp.responseXML;
            var theaterDropdown = document.getElementById("theater-dropdown");

            theaterDropdown.addEventListener("change", function () {
                var selectedTheaterId = theaterDropdown.value;
                var movies = getMoviesByTheater(data, selectedTheaterId);
                displayMovies(movies);
            });
        }
    };

    function getMoviesByTheater(data, theaterId) {
        var theaterElements = data.querySelectorAll('TheatreArea');
        var movies = [];

        for (var i = 0; i < theaterElements.length; i++) {
            var id = theaterElements[i].getElementsByTagName("ID")[0].textContent;

            if (id === theaterId) {
                var titleElements = theaterElements[i].getElementsByTagName("Title");
                for (var j = 0; j < titleElements.length; j++) {
                    var title = titleElements[j].textContent;
                    movies.push(title);
                }
                break; // Stop searching once the theater is found
            }
        }

        return movies;
    }

    function displayMovies(movies) {
        var movieList = document.getElementById("movie-list");
        movieList.innerHTML = ""; // Clear previous content

        for (var i = 0; i < movies.length; i++) {
            var listItem = document.createElement("li");
            listItem.textContent = movies[i];
            movieList.appendChild(listItem);
        }
    }
});
