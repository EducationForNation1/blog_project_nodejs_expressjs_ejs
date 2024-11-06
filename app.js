import express from 'express';
const app = express();
const port = 3000;
import route from './routers/routes.js';
import path from 'path';
import connectdB from './dB/connectdB.js';
import bodyParser from 'body-parser';


// database connection
connectdB('mongodb://localhost:27017/')
// setup of static file
app.use(express.static(path.join(process.cwd(),'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// setup for ejs
app.set('view engine','ejs');
app.set('views','./views');


app.use('/', route)


app.listen(port, ()=>{
    console.log(`Server is running At : https://localhost:${port}`);
})