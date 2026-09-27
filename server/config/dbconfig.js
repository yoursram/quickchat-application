const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;
//Check the connection String
db.on('connected',() =>{
    console.log('DB connected Successfully')
})

db.on('err',() =>{
    console.log('Error Occuured')
})

module.exports = db ;
