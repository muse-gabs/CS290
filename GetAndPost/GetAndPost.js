var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// this is to parse both URL encoded forms and JSON data 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5437);

app.get('/getAndPost',function(req,res){
  // create an array to hold the name and values.
  var daParameterss = [];
  for (var p in req.query){
    daParameterss.push({'name':p,'value':req.query[p]})
  }

  var stuff = {};

  // checks whether there was any data inputted into the array
  if (daParameterss.length == 0) {
     stuff.reqMessage = "GET Request was Received but Request was empty"
  } else {
     stuff.dataList = daParameterss;
     stuff.reqMessage = "GET Request Received"
  }
     res.render('get', stuff);
});

app.post('/getAndPost', function(req,res){
  var parametersForPost = [];
  var otherParameters = [];


  for (var p in req.query){
    parametersForPost.push({'name':p,'value':req.query[p]})
  }

  for (var q in req.body){
    otherParameters.push({'name':p,'value':req.body[p]})
  }

  var IDunnoWhatToNameThis = {};

  if (parametersForPost.length == 0 && otherParameters.length == 0) {
    IDunnoWhatToNameThis.reqMessage = "POST Request was Received but Request was empty"
  } else {
    IDunnoWhatToNameThis.dataList = parametersForPost;
    IDunnoWhatToNameThis.otherDataList = otherParameters;
    IDunnoWhatToNameThis.reqMessage = "POST Request Received"
  }
  res.render('post', IDunnoWhatToNameThis);

});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
