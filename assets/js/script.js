var APIKey = "5586ab080d5afeda6c7380c5c7217c8c";
var searchBarEl = document.querySelector('#search-bar');
var cityStorage = [];
var currentDay = dayjs().format('M/D/YYYY');
var cityCoord = "";


function SearchFormSubmit(event) {
    event.preventDefault();

    var cityInputVal = document.querySelector('#search-input').value;
    var firstLetter = cityInputVal.charAt(0).toUpperCase();
    var remainingLetters = cityInputVal.slice(1);
    var resultText = firstLetter + remainingLetters;
    var pastSearches = document.querySelector('#result-past');
    var pastButton = document.createElement('button');
    var cityLat = [];
    var cityLon = [];
    var currentTemp = "";
    var currentWind = "";
    var currentHumidity = "";
    var forcastTemp = [];
    var forcastWind = [];
    var forcastHumidity = [];
    var icon = '';
    var iconURL = '';
    localStorage.setItem('City', resultText);
    cityStorage.push(resultText);
    console.log(cityStorage)



    if (!cityInputVal) {
        console.error('You need a search input value!');
        return;
    }

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputVal + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
        }).then(function (data) {
            console.log(data);
            cityCoord = data.coord;
            JSON.stringify(cityCoord);
            cityLat.push(cityCoord.lat);
            cityLon.push(cityCoord.lon);
            currentTemp = data.main.temp;
            currentWind = data.wind.speed;
            currentHumidity = data.main.humidity;
            icon = data.weather[0].icon

            iconURL = 'https://openweathermap.org/img/wn/' + icon + '.png';
            console.log(icon = data.weather[0].icon);
            $('#wicon').attr('src', iconURL);
        }).then(function () {
            var forcast = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey + "&units=imperial";
            fetch(forcast)
                .then(function (response) {
                    if (response.ok) {
                        console.log(response);
                        return response.json()
                        // .then(function (data) {
                        //     console.log(data);
                        //     var list = data.list;
                        //     for (i=0; i<list.length; i+=6)


                        // });
                    }
                });
        }).then(function () {
            $(".current").append('<li>Temp: ' + currentTemp + '°F</li>');
            $(".current").append('<li>Wind: ' + currentWind + 'MPH</li>');
            $(".current").append('<li>Humidity: ' + currentHumidity + '%</li>');
            console.log(currentTemp)
        })
        // .then(function () {
        //     $(".current").append('<li>Temp: ' + forcastTemp + '°F</li>');
        //     $(".current").append('<li>Wind: ' + forcastWind + 'MPH</li>');
        //     $(".current").append('<li>Humidity: ' + forcastHumidity + '%</li>');
        //     console.log(currentTemp)
        // });





    document.querySelector('#result-text').textContent = resultText + " (" + currentDay + ")";
    pastSearches.append(pastButton)
    pastButton.innerHTML = resultText
    pastButton.classList.add("w-100")

    pastButton.addEventListener('click', pastFormSubmit);
    function pastFormSubmit() {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + pastButton.innerHTML + "&appid=" + APIKey + "&units=imperial";

        fetch(queryURL)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);
                    });
                }
            });
    }

}



searchBarEl.addEventListener('submit', SearchFormSubmit);

