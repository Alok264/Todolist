//jshint esversion:6

const xpress = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const mongoose = require("mongoose");
const lodash = require("lodash");
const todayDate = require(__dirname+"/views/date.js"); // userbuilt module/package
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);


const app = xpress();
const date_format = todayDate.getDate(); // we can using this function because of module.export = getdate; method;
const day_format = todayDate.getDay();
console.log(date_format+"      "+day_format);
// mongoose.connect('mongodb+srv://clusterfirst.yw5teek.mongodb.net/TodolistDB', {
//   useNewUrlParser: true,
//   auth: {
//     username: 'alokraj262',
//     password: 'Alok@26151216'
//   }
// });
// mongoose.set('strictQuery'.false);
// const connectDB = async() =>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//     }
//     catch(err){
//         console.log(err);
//         process.exit(1);
//     }
// }

const TodoSchema = new mongoose.Schema({
    Name: {type: String,
    required: true}
});

const workSchema = new mongoose.Schema({
    Name: String,
    items: [TodoSchema]
});

const item = mongoose.model("Item", TodoSchema);
const work = mongoose.model("WorkItem", workSchema);


const item1 = new item({
    Name: "Welcome to todo list"
})
const item2 = new item({
    Name: "Hit the + button to add a new item"
})
const item3 = new item({
    Name: "Hit delete button to delete an item"
})

const defaultitems = [item1, item2, item3];
// item.insertMany(defaultitems).then(()=> console.log("Insered successfully")).catch((err)=> console.log(err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(xpress.static(__dirname+"/public"));
app.set('view engine', 'ejs');
//use ejs as view engine

const dateformat = {
        day : 'numeric', // numeric , 2-digit      
        weekday: 'long', // short, long, narrow
        month: 'long', // 2-digit, narrow, short, long, numeric
        year: 'numeric',  // numeric, 2-digit
        /* hour: 'numeric' ,// 2-digit
        minute: 'numeric', // 2-digit
        second: 'numeric', // 2-digit */
        // Dateobject.toLocalDateString("language", format);
    }
let today = new Date();
let date = today.toLocaleDateString("en-IN", dateformat);



app.get('/', (req, res)=>{
     /* day : 'numeric', // numeric , 2-digit      
        weekday: 'long', // short, long, narrow
        month: 'long', // 2-digit, narrow, short, long, numeric
        year: 'numeric',  // numeric, 2-digit
        hour, minute, second: 'numeric', and '2-digit'
        // Dateobject.toLocalDateString("language", format); 
        
        The variables : - day, weekday, month, year, hour, minute, second . All must be same. We cannot change these variables name.

        
        */
    /* let currentDay = today.getDay(); */
    /* var currentdate = today.getDate();
    var currentmonth = (today.getMonth());
    var currentyear = today.getFullYear(); */ 
    /* let day ="";
    switch(currentDay)
    {
        case 0: 
            day = "sunday"; 
            break;
        case 1: 
            day = "Monday"; 
            break;
        case 2: 
            day = "Tuesday";
            break;
        case 3: 
            day = "Wednesday"; 
            break;
        case 4: 
            day = "Thursday"; 
            break;
        case 5: 
            day = "Friday"; 
            break;
        case 6: 
            day = "Saturday"; 
            break;
        default: 
            day = "Error day";
            console.log("Error day");
            break;
    } */

    item.find({}).then((docs)=>
    {
        if(docs.length === 0){item.insertMany(defaultitems).then(()=> console.log("Insered successfully")).catch((err)=> console.log(err + 118));
            res.redirect('/');
        }
        else{ res.render('index', {foo: "Today", TodayDate: date, listitem: docs});}
    }
    ).catch((err)=> console.log(err + 123));
});

app.get('/:customRoute', function(req, res){

    const customlistName = lodash.capitalize(req.params.customRoute);

    work.findOne({Name: customlistName}, { maxTimeMS: 30000 }).then((docs)=> {
        if(!docs){
            const list = new work({
                Name: customlistName,
                items: defaultitems,
            });

            list.save().then(()=> console.log("Inserted successfully")).catch((err)=> console.log(err+ 137));
            res.redirect('/'+ customlistName);
        }
        else{
                res.render('index', {foo: docs.Name , TodayDate: date, listitem: docs.items});
            }
    }).catch((err)=> console.log(err + 143));

    // work.find({}).then((docs)=>
    //     {
    //         if(docs.length === 0){work.insertMany(defaultworks).then(()=> console.log("Insered successfully")).catch((err)=> console.log(err));
    //             res.redirect('/work');
    //         }
    //         else{ res.render("index", {foo: req.params.customRoute, TodayDate: date, listitem: docs});}
    //     }
    //     ).catch((err)=> console.log(err));
})

app.get('/about', function(req, res){
    res.render("about");
});


app.post('/', function(req, res){
    
    let list = req.body.list;
    const listName = lodash.capitalize(req.body.button);
    listItem = new item({
        Name: list
    });

    if(listName=="Today"){listItem.save().then(()=> console.log("Saved")).catch((err)=> console.log(err + 168));;
    res.redirect('/');}
    else{
            work.findOne({Name: listName}).then((docs)=> {
            docs.items.push(listItem);
            docs.save().then(()=> console.log("Saved docs"));
            res.redirect('/'+ listName);
        }).catch((err)=> console.log(err + 175));;
    }
})



app.post('/delete', function(req, res){
        const checkedId = req.body.check;
        const listName = lodash.capitalize(req.body.ListName);

        if(listName == "Today")
        {
            item.deleteOne({_id: checkedId}).then(()=> console.log("Deleted successfully")).catch((err)=> console.log(err+ 187));;
            res.redirect('/');
        }
        else
        {
            work.findOneAndUpdate({Name: listName}, {$pull: {items:{_id: checkedId}}}).then((docs)=> {
                res.redirect('/'+ listName);
            }).catch((err)=> console.log(err + 194));
        }
        
})




client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});




// Mongo Atlas cluster link 
//mongosh "mongodb+srv://clusterfirst.yw5teek.mongodb.net/myFirstDatabase" --apiVersion 1 --username alokraj262
