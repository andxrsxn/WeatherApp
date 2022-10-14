//****** DAY JS STUFF TO SET 5 DAY FORCAST**********//
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);



//****GLOBAL VARIABLES********//
const searchHistory = [];
const apiKey = "4db6aabe9e248af6b48db5ef23dcc6c6";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${apiKey}`;
var dynoLocStats;
var dynoChosenCity;
var dynoLocStatsFiveDay;


//****GLOBAL FUNCTIONS*******//
function chosenLocationStats(latLon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&units=imperial&appid=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
    dynoLocStats = { "curTemp": data.current.temp, "curWin": data.current.wind_speed, "curHumidity": data.current.humidity, "curUV": data.current.uvi,"curName": data.name };
    console.log(dynoLocStats);
    $("#currentChosenLocationTemp").text("Current Temp:" + dynoLocStats.curTemp + "F");
    $("#currentChosenLocationWind").text(dynoLocStats.curWin);
    $("#currentChosenLocationHumidity").text(dynoLocStats.curHumidity);
    $("#currentChosenLocationUVindex").text(dynoLocStats.curUV);}
   );
};
//// function for setting up geolocation based on user input////
function dynoLocation(chosenLocation){
    console.log(chosenLocation);
    var dynoLoc = `https://api.openweathermap.org/geo/1.0/direct?q=${chosenLocation},&limit=5&appid=${apiKey}`;
    fetch(dynoLoc)
    .then(function(response){
        return response.json();
    })
    .then (function(data) {
        console.log(data);
     let latLon= { "lat": data[0].lat, "lon": data[0].lon}
        console.log(latLon)
        chosenLocationStats(latLon);

    })
};
//// function for setting up fiveday forcast///
function chosenLocationFiveDay(latLon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&units=imperial&appid=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        var dayOne= { "temp": data.daily[0].temp, "humidity": data.daily[0].humidity, "uvi": data.daily[0].uvi, "wind": data.daily[0].wind_speed};
        var dayTwo= { "temp": data.daily[1].temp, "humidity": data.daily[1].humidity, "uvi": data.daily[1].uvi, "wind": data.daily[1].wind_speed};
        var dayThree= { "temp": data.daily[2].temp, "humidity": data.daily[2].humidity, "uvi": data.daily[2].uvi, "wind": data.daily[2].wind_speed};
        var dayFour= { "temp": data.daily[3].temp, "humidity": data.daily[3].humidity, "uvi": data.daily[3].uvi, "wind": data.daily[3].wind_speed};
        var dayFive= { "temp": data.daily[4].temp, "humidity": data.daily[4].humidity, "uvi": data.daily[4].uvi, "wind": data.daily[4].wind_speed};
        console.log(dayOne);
        dynoLocStatsFiveDay = { dayOne,dayTwo,dayThree,dayFour,dayFive};
        console.log(dynoLocStatsFiveDay);
    $("#dayOneTemp").text( "Temp:" + dynoLocStatsFiveDay.dayOne.temp.day + "F");
    $("#dayOneWind").text( "Winds:" + dynoLocStatsFiveDay.dayOne.wind + "MPH");
    $("#dayOneHumidity").text( "Humidity:" + dynoLocStatsFiveDay.dayOne.humidity);
    $("#dayOneUVI").text( "UVI:" + dynoLocStatsFiveDay.dayOne.uvi);

    $("#dayTwoTemp").text( "Temp:" + dynoLocStatsFiveDay.dayTwo.temp.day + "F");
    $("#dayTwoWind").text( "Winds:" + dynoLocStatsFiveDay.dayTwo.wind + "MPH");
    $("#dayTwoHumidity").text( "Humidity:" + dynoLocStatsFiveDay.dayTwo.humidity);
    $("#dayTwoUVI").text( "UVI:" + dynoLocStatsFiveDay.dayTwo.uvi);

    $("#dayThreeTemp").text( "Temp:" + dynoLocStatsFiveDay.dayThree.temp.day + "F");
    $("#dayThreeWind").text( "Winds:" + dynoLocStatsFiveDay.dayThree.wind + "MPH");
    $("#dayThreeHumidity").text( "Humidity:" + dynoLocStatsFiveDay.dayThree.humidity);
    $("#dayThreeUVI").text( "UVI:" + dynoLocStatsFiveDay.dayThree.uvi);

    $("#dayFourTemp").text( "Temp:" + dynoLocStatsFiveDay.dayFour.temp.day + "F");
    $("#dayFourWind").text( "Winds:" + dynoLocStatsFiveDay.dayFour.wind + "MPH");
    $("#dayFourHumidity").text( "Humidity:" + dynoLocStatsFiveDay.dayFour.humidity);
    $("#dayFourUVI").text( "UVI:" + dynoLocStatsFiveDay.dayFour.uvi);

    $("#dayFiveTemp").text( "Temp:" + dynoLocStatsFiveDay.dayFive.temp.day + "F");
    $("#dayFiveWind").text( "Winds:" + dynoLocStatsFiveDay.dayFive.wind + "MPH");
    $("#dayFiveHumidity").text( "Humidity:" + dynoLocStatsFiveDay.dayFive.humidity);
    $("#dayFiveUVI").text( "UVI:" + dynoLocStatsFiveDay.dayFive.uvi);
});
};
///// Function used for fiveday info sepcifically////
function dynoLocationFiveDay(chosenLocation){
    console.log(chosenLocation);
    var dynoLoc = `https://api.openweathermap.org/geo/1.0/direct?q=${chosenLocation},&limit=5&appid=${apiKey}`;
    fetch(dynoLoc)
    .then(function(response){
        return response.json();
    })
    .then (function(data) {
        console.log(data);
        let latLon= { "lat": data[0].lat, "lon": data[0].lon};
        console.log(latLon);
        chosenLocationFiveDay(latLon);

    })
};

//*********BELOW IS THE EVENT LISTENERS FOR THE PRESET CITYS**************//
$(document).on('click', ".city", function (){
   var listCity = $(this).text();
   console.log(listCity);
   dynoLocation(listCity);
   dynoLocationFiveDay(listCity);
   $("#currentChosenLocation").text(listCity);

});

$(document).on('click', "#searchBtn", function(){
    dynoChosenCity = document.querySelector("#citySearchInputBox").value;
    console.log (dynoChosenCity);
    dynoLocation(dynoChosenCity);
    dynoLocationFiveDay(dynoChosenCity);
    $("#currentChosenLocation").text(dynoChosenCity);
});
