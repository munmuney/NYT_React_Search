// ---------- Dependencies ---------- //
var express = require('express');
var mongoose = require('mongoose');
var logger = require("morgan");
var bodyParser = require('body-parser');


// ----- model ----- //
var Article = require('./models/Article.js');




// ----- express ----- //
var app = express();


// ----- morgan and body parser ----- //
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// ----- Set public directory as static ----- //
app.use(express.static('./public'));

// ---------- HEROKU DB CONNECTION ----------- //
if (process.env.MONGODB_URI) mongoose.connect(process.env.MONGODB_URI);
else mongoose.connect("mongodb://localhost/NYT_React");


var db = mongoose.connection;


// ----- Show any mongoose errors ----- //

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

// ----- Once logged in to the db through mongoose, log a success message ----- //

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


//---------- ROUTES ---------- // 
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

app.get('/api/saved', function(req, res) {

  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

app.post('/api/saved', function(req, res){
  var newArticle = new Article(req.body);

  var title = req.body.title;
  var date = req.body.date;
  var url = req.body.url;

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
    } else {
      res.send(doc._id);
    }
  });
});

app.delete('/api/saved/', function(req, res){

  var url = req.param('url');

  Article.find({"url": url}).remove().exec(function(err, data){
    if(err){
      console.log(err);
    }
    else {
      res.send("Deleted");
    }
  });
});



// ---------- SERVER ---------- //
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
