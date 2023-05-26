var APIKey = "5586ab080d5afeda6c7380c5c7217c8c";
var searchBarEl = document.querySelector('#search-bar');
var cityStorage = [];
var currentDay = dayjs().format('M/D/YYYY');
var cityCoord = "";
var pastcityCoord = "";


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
    var pastcityLat = [];
    var pastcityLon = [];
    var currentTemp = "";
    var currentWind = "";
    var currentHumidity = "";
    var forcastTemp = [];
    var forcastWind = [];
    var forcastHumidity = [];
    var icon = '';
    var iconURL = '';
    var forcastIcon = '';
    localStorage.setItem('City', resultText);
    cityStorage.push(resultText);
    console.log(cityStorage)


    $('.card').empty();
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
            $('#wicon').attr('src', iconURL);


        }).then(function () {
            var forcast = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey + "&units=imperial";
            fetch(forcast)
                .then(function (response) {
                    if (response.ok) {
                        console.log(response);
                        return response.json()
                            .then(function (data) {
                                console.log(data);
                                var list = data.list;
                                for (i = 3; i < list.length; i += 8) {
                                    forcastTemp = (list[i].main.temp);
                                    forcastWind = (list[i].wind.speed);
                                    forcastHumidity = (list[i].main.humidity);
                                    forcastDate = (list[i].dt_txt)
                                    forcastIcon = (list[i].weather[0].icon)
                                    var forcasticonURL = 'https://openweathermap.org/img/wn/' + forcastIcon + '.png';
                                    console.log(forcastIcon)
                                    $(".card").append('<h3>' + ' (' + forcastDate + ')<img id="ficon" src="" alt="Weather icon">')
                                    $('#ficon').attr('src', forcasticonURL);
                                    $(".card").append('<li>Temp: ' + forcastTemp + '°F</li>');
                                    $(".card").append('<li>Wind: ' + forcastWind + 'MPH</li>');
                                    $(".card").append('<li>Humidity: ' + forcastHumidity + '%</li>');
                                }
                            });
                    }
                });
        }).then(function () {
            currentDay = dayjs().format('M/D/YYYY');
            $("#result-text").append('<h3>' + resultText + ' (' + currentDate + ')<img id="wicon" src="" alt="Weather icon">')
            $(".current").append('<li>Temp: ' + currentTemp + '°F</li>');
            $(".current").append('<li>Wind: ' + currentWind + 'MPH</li>');
            $(".current").append('<li>Humidity: ' + currentHumidity + '%</li>');
            console.log(currentTemp)
        });





    document.querySelector('#result-text').textContent = resultText + " (" + currentDay + ")";
    pastSearches.append(pastButton)
    pastButton.innerHTML = resultText
    pastButton.classList.add("w-100")

    pastButton.addEventListener('click', pastFormSubmit);
    function pastFormSubmit() {
        $('.card').empty();
        $('.current').empty();
        var pastQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + pastButton.innerHTML + "&appid=" + APIKey + "&units=imperial";

        fetch(pastQueryURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }


        }).then(function (data) {
            console.log(data);
            pastcityCoord = data.coord;
            JSON.stringify(cityCoord);
            pastcityLat.push(pastcityCoord.lat);
            pastcityLon.push(pastcityCoord.lon);
            currentTemp = data.main.temp;
            currentWind = data.wind.speed;
            currentHumidity = data.main.humidity;
            icon = data.weather[0].icon
            iconURL = 'https://openweathermap.org/img/wn/' + icon + '.png';
            $('#wicon').attr('src', iconURL);


        }).then(function () {
            var forcast = "http://api.openweathermap.org/data/2.5/forecast?lat=" + pastcityLat + "&lon=" + pastcityLon + "&appid=" + APIKey + "&units=imperial";
            fetch(forcast)
                .then(function (response) {
                    if (response.ok) {
                        console.log(response);
                        return response.json()
                            .then(function (data) {
                                console.log(data);
                                var list = data.list;
                                for (i = 3; i < list.length; i += 8) {
                                    forcastTemp = (list[i].main.temp);
                                    forcastWind = (list[i].wind.speed);
                                    forcastHumidity = (list[i].main.humidity);
                                    forcastDate = (list[i].dt_txt)
                                    forcastIcon = (list[i].weather[0].icon)
                                    var forcasticonURL = 'https://openweathermap.org/img/wn/' + forcastIcon + '.png';
                                    console.log(forcastIcon)
                                    $(".card").append('<h3>' + ' (' + forcastDate + ')<img id="ficon" src="" alt="Weather icon">')
                                    $('#ficon').attr('src', forcasticonURL);
                                    $(".card").append('<li>Temp: ' + forcastTemp + '°F</li>');
                                    $(".card").append('<li>Wind: ' + forcastWind + 'MPH</li>');
                                    $(".card").append('<li>Humidity: ' + forcastHumidity + '%</li>');
                                }
                            });
                    }
                });
        }).then(function () {
            currentDay = dayjs().format('M/D/YYYY');
            $("#result-text").append('<h3>' + resultText + ' (' + currentDate + ')<img id="wicon" src="" alt="Weather icon">')
            $(".current").append('<li>Temp: ' + currentTemp + '°F</li>');
            $(".current").append('<li>Wind: ' + currentWind + 'MPH</li>');
            $(".current").append('<li>Humidity: ' + currentHumidity + '%</li>');
            console.log(currentTemp)
        })
    }


}
searchBarEl.addEventListener('submit', SearchFormSubmit);
