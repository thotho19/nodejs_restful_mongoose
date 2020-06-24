const express  = require('express'),
      ejs      = require('ejs'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      app        = express();
//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/restful_tutorial',
{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true , useFindAndModify: false});
const User = require('./dataBase/schema').User;

//middleware
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));

//rouets 
app.get('/' , (req , res)=>{
        User.find((err , Data)=>{
            if(err){
                console.log(err);
            }else{
                res.render('index.ejs' , {Data:Data})
            }
        });
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
            res.redirect('/');
        }
    })
})
app.delete('/' , (req , res)=>{
    var id = req.body.id;
    console.log(id);
    User.findByIdAndRemove( id , (err , success)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Data deleted')
        }
    });
});
var temp;
app.put('/' , (req , res)=>{
    var id = req.body.id;
        var title= req.body.title;
        var firstName= req.body.firstName;
        var lastName= req.body.lastName;
        
    if(id){
        temp = id;
        User.findOne({'_id': id} , (err , ok)=>{
            if(err){
                console.log(err);
            }else{
                res.render('index2.ejs' , {oks: ok});
            }
        })
    }else{
        console.log(temp);
        User.findByIdAndUpdate(temp , {'title': title , 'firstName': firstName , 'lastName': lastName} , (err , updated)=>{
                if(err){
                    console.log(err);
                    res.redirect('/');
                }else{
                    res.redirect('/');
                }  
            });
    }
})

app.listen(3000 , ()=>{
    console.log('Nodejs backend server is start working!');
});