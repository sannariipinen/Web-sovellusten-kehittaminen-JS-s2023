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
document.addEventListener("DOMContentLoaded", function () {
    var scheduleUrl = "https://www.finnkino.fi/xml/Schedule/?area=";
    var xmlhttp = new XMLHttpRequest();
    var data;

    xmlhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = xmlhttp.responseXML;
            var theaterDropdown = document.getElementById("theater-dropdown");

            theaterDropdown.addEventListener("change", function () {
                var selectedTheaterId = theaterDropdown.value;
                var scheduleApiUrl = scheduleUrl + selectedTheaterId;
                
                fetchScheduleData(scheduleApiUrl);
            });
        }
    };

    function fetchScheduleData(apiUrl) {
        var scheduleXmlhttp = new XMLHttpRequest();
        scheduleXmlhttp.open("GET", apiUrl, true);
        scheduleXmlhttp.send();

        scheduleXmlhttp.onreadystatechange = function () {
            if (scheduleXmlhttp.readyState == 4 && scheduleXmlhttp.status == 200) {
                var scheduleData = scheduleXmlhttp.responseXML;
                displaySchedule(scheduleData);
            }
        };
    }

    function displaySchedule(scheduleData) {
        // Customize this function to display the schedule data as needed
        console.log(scheduleData);
    }
});
