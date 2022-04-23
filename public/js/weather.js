const express=require('express');
const axios=require('axios');
const port=4000;
const app=express();
const bodyparser=require('body-parser');
const path=require('path');

app.use(bodyparser.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

app.get('/',(req,res)=>{
    console.log("Get is done");
    res.render('front');
});

app.post('/',async(req,res)=>{
     let address=await req.body.city;
     console.log(address);
     const r=await axios.get(`https://api.weatherapi.com/v1/current.json?key=f7e8c81ec7264fdf87c150732221304&q=${address}&aqi=no`);
     const city=r.data.location.name;
    const region=r.data.location.region;
    const country=r.data.location.country;
    const temp_c=r.data.current.temp_c;
    const temp_f=r.data.current.temp_f;  
    const humidity=r.data.current.humidity; 
    const cloud=r.data.current.cloud;
    const text=r.data.current.text;
   //res.send(`<h1>In ${city} the current weather is ${temp_c} degree celcius and ${temp_f} farenheit and ${humidity}`);
   res.render('front',{
       city,region,country,temp_c,temp_f,humidity,cloud,text
   });
});
app.listen(port,()=>{
    console.log(`server started and listening to the port ${port}`);
});