const divVideo = document.querySelector('#vidBox');
const canvas2 = document.querySelector('#canvas');
const content = document.querySelector('.content1-center');


let city_name = 'undefined';
let weather = 'undefined';
let temp = 'undefined';
let lat = 'undefined';
let lon = 'undefined';
//let api_key = 'undefined';







function setup() {
    //Create video in the element for client screen
    //navigator.mediaDevices.getUserMedia({
        //video: true
    //}).then(stream => {
       //document.getElementById('video').srcObject = stream;
    //});




    //Create video to use base64 data
    noCanvas();
    //const media = createCapture(VIDEO);
    //media.size(0,0);
    //media.position(-1000,-1000);


    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat.toFixed(2);
            document.getElementById('longitude').textContent = lon.toFixed(2);
            //Weather API




            const api_key = "293a3bc9a37743dfb48df9cfd0d44dc1";
            const api_url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${api_key}&include=minutely&units=I`;
            const weather_response = await fetch(api_url);
            const castData = await weather_response.json();


            city_name = castData.data[0].city_name;
            weather = castData.data[0].weather.description;
            temp = castData.data[0].temp;

            document.getElementById('cityName').textContent = city_name;
            document.getElementById('weather').textContent = weather;
            document.getElementById('temp').textContent = temp;

        });
    }
}


                


                
