function loadDate() {
    var currentDate = new Date()
    var dateString = currentDate
        .toString()
        .split(' ')
        .splice(0, 4)
        .join(' ')

    $('#date').text(dateString)
}

function loadWeather() {
    var weather = $('#weather')
    var url = 'https://api.openweathermap.org/data/2.5/weather'
    var apiKey = '3d86add0816188bca880c327ff72094d'

    function success(position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude

        $.getJSON(
            url + '?units=imperial&lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey,
            function(data) {
                weather.html(
                    '<strong>Based on your current location:</strong><br>' +
                    'Temperature: ' + data.main.temp + '° F<br>' +
                    'Condition: ' + data.weather[0].main + '<br>' +
                    'Humidity: ' + data.main.humidity + '%'
                )
            }
        )
    }

    function error() {
        weather.html('<div class="alert alert-danger">Unable to retrieve your location for weather</div>')
    }

    navigator.geolocation.getCurrentPosition(success, error)

    weather.html('<div class="text-center">Fetching weather...</div>')
}

function loadNews() {
    var news = $('#news')
    var url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey='
    var apiKey = 'b33a8b7fabcbe3cc4aa291153e150f88'

    $.getJSON(url + apiKey, function(data) {
        var newsItems = data.articles.map(function(article) {
            return '<a href="' + article.url + '" class="list-group-item list-group-item-action" target="_blank">' +
                '<h5 class="mb-1">' + article.title + '</h5>' +
                '<p class="mb-1">' + article.description + '</p>' +
                '<small>Source: ' + article.source.name + '</small>' +
                '</a>'
        })

        news.html(newsItems.join(''))
    }).fail(function() {
        news.html('<div class="alert alert-danger">Failed to fetch news. Please try again later.</div>')
    })

    news.html('<div class="text-center">Fetching news...</div>')
}

$(document).ready(function() {
    loadDate()
    loadWeather()
    loadNews()
})