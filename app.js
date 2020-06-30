const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
})

app.post('/',(req,res) => {
    const query = req.body.inp1;
    const apiKey = "f084ef3027b06553afe9f39cbecd828a";
    const units = "metric";
    const url ='https://api.openweathermap.org/data/2.5/weather?q='+query+'&units='+units+'&appid='+apiKey;
    https.get(url, (response) => {
//   const contentType = response.headers['content-type'];
        // let rawData = '';
        response.on('data', (data) => { 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl =  "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp);
            console.log(desc);
            res.write("<div><h1>The temperature in "+ query+ " is "+temp +" degree celsius <h1>");
            // res.write("<img src="+imageUrl+ "> </div>")
            res.write("<h2>The weather in "+ query+ " is "+desc +"</h2>");
            res.write("<img src="+imageUrl+ "> </div>")
            res.send();
         });
            
})
})






app.listen(3000, () => {
    console.log("Server is running on 3000");
})