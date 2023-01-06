const apiKey = '7277aa1c9476e1ced7d7a5d60159a2f7'

$('form').submit(function(event) {
    event.preventDefault();
    var city = $('input').val();
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: city,
        appid: apiKey,
        units: imperial
      },
      success: function(response) {
   
      }
    });
  });

  $('.city-button').click(function() {
    var city = $(this).data('city');
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: city,
        appid: apiKey,
        units: imperial
      },
      success: function(response) {

      }
    });
  });