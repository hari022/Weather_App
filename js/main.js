
$(document).ready(function () {

    //****Get the user location****
    if ("geolocation" in navigator){ //check geolocation available
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){
           // $("#result").html("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            getCityName(lat, long)
            // alert('LAT:'+ lat +', '+'LONG:'+ long );

        });
    }else{
        console.log("Browser doesn't support geolocation!");
    }

    function getCityName(lat, lng) {

        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var address = results[1].formatted_address;
                    var splitAddress = address.split(',');
                    var city = splitAddress[1]
                    console.log(city);
                    getData(city);
                }
            }
        });

    }

    // ****Get input box value****
    $('#submit').click(function () {

        var cityName = $('#city').val();
        getData(cityName);

    });
//****Make API request using Ajax  to get the data from openweather.com
function getData(cityName) {
    $.ajax(
        {url: 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=metric&APPID=7130642eba61eb1b252f1bf19650c38e',
            type: "GET",
            crossDomain: true,}
    ).done(function(data) {
        console.log(data);

            console.log(data.main.temp);
            $('#data').fadeIn();
            $('#ct').fadeIn().text('Current Temperature - '+data.main.temp +String.fromCharCode(176)+'C' );
            $('#mit').fadeIn().text('Minimum Temperature - '+data.main.temp_min+String.fromCharCode(176)+'C');
            $('#mat').fadeIn().text('Maximum Temperature - '+data.main.temp_max+String.fromCharCode(176)+'C');
            $('#lt').fadeIn().text('City Name - '+cityName);

        // alert('Temp: '+data.main.temp);
    }).fail(function (jqXHR, textStatus) {
        console.log(jqXHR.status);
        if(jqXHR.status ==404) {

            $('#data').fadeIn();
            $('#ct').text('City Not Found :-(');
            $('#mit').hide();
            $('#mat').hide();
            $('#lt').hide();
        }
    });


}



});