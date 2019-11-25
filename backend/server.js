let port = process.env.PORT || 4000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

    var express = require('express')
    ,cors = require('cors')
    , app = express();
  
  //app.user(bodyParser.json());
  // after the code that uses bodyParser and other cool stuff
  var originsWhitelist = [
    'http://localhost:4200'     
    
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors(corsOptions));



// mongoose instance connection url connection
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Initialize app
let initApp = require('./api/app');
initApp(app);

app.listen(port);
console.log('Listening on port: ' + port);