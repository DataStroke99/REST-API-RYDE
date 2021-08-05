const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router();



const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true})

//app.use(urlencodedParser)
app.use(jsonParser)




// Connect to DB
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');





// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");   



}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});









require('./routes/api/index.js')(app);

module.exports = app

app.listen(port, ()=> console.log("Listening on port "+port+" ..."))



