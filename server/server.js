
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

//database connection from configuration file
const dbconfig = require('./config/dbconfig');

const app = require('./app')
const port = process.env.PORT_NUMBER || 3000 ;

app.listen(port, ()=>{
    console.log('Litening to request on PORT:' + port);
});
