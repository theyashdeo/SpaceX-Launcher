const express = require('express')
const errorhandler = require('errorhandler')
const logger= require('morgan')
const bodyparser =require('body-parser')





let app = express();
app.use(bodyparser.json())
app.use(logger('dev'))
app.use(errorhandler())


// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));


/*

app.get('/apidata',(req, res)=>{
    async function apicall(){
       const response = await fetch(`https://api.spaceXdata.com/v3/lau
       nches?limit=100`);
       const data = await response.json();
       res.status(200).send(data);
    }

    apicall();
})
*/

// Root path

app.get("/", (req, res) => {

    async function apicall(){
        const response = await fetch(`https://api.spaceXdata.com/v3/lau
        nches?limit=100`);
        const data = await response.json();
        res.status(200).send(data);
     }
 
     apicall();

   // res.sendFile(`${__dirname}/views/index.html`);
    //res.send("hello");
     //res.json({"message":"Ok"});
});

app.listen(process.env.PORT || 3000);
