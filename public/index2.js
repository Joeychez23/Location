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
            try {
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




                const aq_url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}`;
                const aq_response = await fetch(aq_url);
                const aq_data = await aq_response.json();




                air = aq_data.results[0].measurements[0];

                document.getElementById('aq_parameter').textContent = air.parameter;
                document.getElementById('aq_value').textContent = air.value;
                document.getElementById('aq_units').textContent = air.unit;
                document.getElementById('aq_date').textContent = air.lastUpdated;





                const data = {lat, lon, city_name, weather, temp , air}; //, name, image64};
                const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
        
                };
                //console.log(options)
                const response = await fetch('/api', options);
                const db_val = await response.json();
            } catch(error) {
                document.getElementById('cityName').textContent = city_name;
                document.getElementById('weather').textContent = weather;
                document.getElementById('temp').textContent = temp;
                document.getElementById('air_con').textContent = 'No reading available in this area :(';

                //document.getElementById("issMap").style.height = "260px";
                //document.getElementById("issMap").style.visibility = "visible";


                //name value
                //const name = nameStr.value;
                //Load Image into base64
                //media.loadPixels();
                //const image64 = media.canvas.toDataURL();
                //data.image64 = image64;
                const data = {lat, lon, city_name, weather, temp}; //, name, image64};
                const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
    
                };
                //console.log(options)
                const response = await fetch('/api', options);
                const db_val = await response.json();
                //console.log(db_val);
            }
            //console.log(position);
            //const nameStr = document.getElementById('nameBox');
            //const data = {lat, lon};
            //document.getElementById('subData').addEventListener("click", async function() {
                //name value
                //const name = nameStr.value;
                //Load Image into base64
                //media.loadPixels();
                //const image64 = media.canvas.toDataURL();
                //data.image64 = image64;
                //const data = {lat, lon, city_name}; //, name, image64};
                //const options = {
                //method: 'POST',
                //headers: {
                //    'Content-Type': 'application/json' 
                //},
                //body: JSON.stringify(data);
                //};
                //console.log(options)
                //const response = await fetch('/api', options);
                //const val = await response.json();
                //console.log(val);
            //});
        });
    } else {
        console.log('geolocation not available');
    }
}


                


                
