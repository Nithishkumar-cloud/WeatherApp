const express=require('express');
const axios=require('axios');
const port=4000;
const app=express();
const bodyparser=require('body-parser');
const path=require('path');

app.use(bodyparser.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");
app.use(express.static('public'));

app.get('/',(req,res)=>{
    console.log("Get is done");
    res.render('front');
});

app.post('/',async(req,res)=>{
     let address=await req.body.city;
     console.log(address);
     const r=await axios.get(`https://api.weatherapi.com/v1/current.json?key=f7e8c81ec7264fdf87c150732221304&q=${address}&aqi=no`);
     const city=r.data.location.name;
    const temp_c=r.data.current.temp_c; 
    const temp_f=r.data.current.temp_f; 
    const longitude=r.data.location.lon;
    //console.log(longitude);
    const latitude=r.data.location.lat;
    //console.log(latitude);
    const humidity=r.data.current.humidity; 
    const wind_dir=r.data.current.wind_dir;
    //console.log(wind_dir);
    const text=r.data.current.condition.text;
    const wind_kph=r.data.current.wind_kph;
    const pressure_mb=r.data.current.pressure_mb;
    const localtime=r.data.location.localtime;
    const icons=r.data.current.condition.icon;
    //console.log(icons);
  //res.send(`<h1>In ${city} the current weather is ${latitude} degree celcius and ${longitude} farenheit and ${humidity}`);
   res.render('front',{
      city,temp_c,humidity,wind_dir,text,wind_kph,pressure_mb,temp_f,latitude,longitude,localtime,icons
  });
});
app.listen(port,()=>{
    console.log(`server started and listening to the port ${port}`);
});