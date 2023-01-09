const apiKey = '7277aa1c9476e1ced7d7a5d60159a2f7'

$('form').submit(function(event) {
    event.preventDefault();
    $('#weather-display').empty();
    var city = $('input').val();
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: city,
        appid: apiKey,
        units: 'imperial'
      },
      success: function(response) {
   var forecastDays = [];

   // loop through the forecast data and extract the data for each day
   for (var i = 0; i < response.list.length; i++) {
    var forecast = response.list[i];

     // get the date of the forecast
     var forecastDate = new Date(forecast.dt * 1000);

     // check if we already have a forecast for this day
     var existingForecast = forecastDays.find(function(day) {
       return day.date.getDate() === forecastDate.getDate();
     });

     if (existingForecast) {
       // if we already have a forecast for this day, just add this forecast to the list of forecasts for the day
       existingForecast.forecasts.push(forecast);
     } else {
       // if this is a new day, create a new forecast day object
       forecastDays.push({
         date: forecastDate,
         forecasts: [forecast]
       });
     }
   }

   // now that we have an array of forecast days, we can create a Bootstrap card for each day
   forecastDays.forEach(function(day) {
     // create a container for the day's forecast
     var container = $('<div>').addClass('card mb-3 bg-info-subtle w-25');

     // create a header for the day
     var header = $('<div>').addClass('card-header').text(day.date.toDateString());

     // create a body for the day
     var body = $('<div>').addClass('card-body');

     // add the header and body to the container
     container.append(header, body);

     // loop through the forecasts for the day and add them to the body
     day.forecasts.forEach(function(forecast) {
       // create a container for the forecast
       var forecastContainer = $('<div>').addClass('d-flex align-items-center mb-2');

        // create an icon for the forecast using the weather icon code from the API
        var icon = $('<i>').addClass('wi wi-owm-' + forecast.weather[0].id);

        // create a text container for the forecast details
        var text = $('<div>').addClass('ml-3');

        // add the temperature and weather conditions to the text container
        text.append('<p>' + forecast.main.temp + '°F</p>');
        text.append('<p>' + forecast.weather[0].description + '</p>');

        // add the icon and text to the forecast container
        forecastContainer.append(icon, text);

       // add the forecast container to the body of the card
       body.append(forecastContainer);
     });

     // add the card to the page
     $('#weather-display').append(container);
   });
      }
    });
  });

  $('.city-button').click(function() {
    $('#current-weather-container').empty();
    $('#weather-display').empty();
    var city = $(this).data('city');
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: city,
        appid: apiKey,
        units: `imperial`
      },
      success: function(response) {
        var forecastDays = [];

   
   for (var i = 0; i < response.list.length; i++) {
    var forecast = response.list[i];

     
     var forecastDate = new Date(forecast.dt * 1000);

     
     var existingForecast = forecastDays.find(function(day) {
       return day.date.getDate() === forecastDate.getDate();
     });

     if (existingForecast) {
       
       existingForecast.forecasts.push(forecast);
     } else {
       
       forecastDays.push({
         date: forecastDate,
         forecasts: [forecast]
       });
     }
   }

   
   forecastDays.forEach(function(day) {

     var container = $('<div>').addClass('card mb-3 bg-info-subtle w-25');
     var header = $('<div>').addClass('card-header').text(day.date.toDateString());

     var body = $('<div>').addClass('card-body');

     container.append(header, body);

     day.forecasts.forEach(function(forecast) {
      
       var forecastContainer = $('<div>').addClass('d-flex align-items-center mb-2');

        var icon = $('<i>').addClass('wi wi-owm-' + forecast.weather[0].id);

        var text = $('<div>').addClass('ml-3');

        text.append('<p>' + forecast.main.temp + '°F</p>');
        text.append('<p>' + forecast.weather[0].description + '</p>');

        forecastContainer.append(icon, text);

       body.append(forecastContainer);
     });

     // add the card to the page
     $('#weather-display').append(container);
   });
      }
    });
  });