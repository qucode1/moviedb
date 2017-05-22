var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

var movies = [];


app.get("/", function(req, res){
    movies = [];
    res.render("form", {results: movies});
});

app.get("/results", function(req, res){
    var term = "https://api.themoviedb.org/3/search/movie?api_key=" + process.env.MOVIEDBAPI +"&query=" + req.query.term;
    var imagePath = "https://api.themoviedb.org/3/configuration?api_key=" + process.env.MOVIEDBAPI;
    request(term, function(error, response, body){
        if(!error & response.statusCode == 200){
            var parsedData = JSON.parse(body);
            movies = parsedData.results;
            res.render("form", {results: movies});
        }
    })
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is live");
})