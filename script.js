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
                weather.text(
                    'Based on your current location, it is ' +
                    data.main.temp +
                    '° F right now'
                )
            }
        )
    }

    function error() {
        alert('Unable to retrieve your location for weather')
    }

    navigator.geolocation.getCurrentPosition(success, error)

    weather.text('fetching weather...')
}

function loadNews() {
    var news = $('#news')
    var url = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey='
    var apiKey = '6284e415eff74466ab1e9a500f9be3fa'

    $.getJSON(url + apiKey, function(data) {
        var titles = data.articles.map(function(article) {
            return "<a href='" + article.url + "'>" + article.title + '</a>'
        })

        news.html(titles.join('<br><br>'))
    })

    news.text('fetching news...')
}


loadDate()
loadWeather()
loadNews()