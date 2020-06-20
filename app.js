const express  = require('express'),
      ejs      = require('ejs'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      app        = express();
//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/restful_tutorial',
{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true});
const User = require('./dataBase/schema').User;

//middleware
app.use(bodyParser.urlencoded({extended: true}));
//rouets 
app.get('/' , (req , res)=>{
        res.render('index.ejs');
})
app.post('/' , (req , res)=>{
    var item = {
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    User.create(item , (err , success)=>{
        if(err){
            res.send('something went wrong!!');
            console.log(`error: ${err}`);
        }else{
            res.send('Yeeeeeea Book have been stored <3');
        }
    })
})

app.listen(3000 , ()=>{
    console.log('Nodejs backend server is start working!');
});