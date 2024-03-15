const express = require("express");
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const port = 80;

        //MONGOOSE SERVER
        main().catch(err => console.log(err));
        async function main() {
            mongoose.connect('mongodb://127.0.0.1:27017/DanceForm');
            console.log('Connection Successful');
        }

        //MONGOOSE SCHEMA
        const contactSchema = mongoose.Schema({
            name : {
                type :String,
                required : true },
            email : {
                type :String,
                required : true },
            gender : {
                type :String,
                required : true },
            number : {
                type :Number,
                required : true },
            address : {
                type :String,
                required : true },
            description : {
                type :String,
                required : true }
        });

        //MONGOOSE MODEL
        const Contact = mongoose.model('Contact',contactSchema);


//EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // for serving static files 
app.use(express.urlencoded({ extended: true }));

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the templete engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    // const params = { }
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    // const params = { }
    res.status(200).render('contact.pug');
});
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send('<div style="background-color: black; height:100%; font-size: 100px; color: white; text-align: center;">This Details have been Saved</div>');
    }).catch(()=>{
        res.status(400).send('Details not Saved');
    })
});




//Server
app.listen(port, () => {
    console.log('SERVER SUCCESSFULLY START ON PORT');
});