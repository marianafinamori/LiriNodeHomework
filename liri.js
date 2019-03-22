//Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Add code to import the keys.js file and store it in a variable
var keys = require("./keys.js");


//Store keys information in a variable to access it
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//REQUIRING NPM PACKAGES:
//Require fs package to read and write
var fs = require("fs");
//Require moment
var moment = require('moment');


//Make it so liri.js can take in one command
var command = process.argv[2];
var songName;

//For different inputs "process.argv[2], a specific function will be called"
if (command === "concert-this") {
    concertThis();
} else if (command === "spotify-this-song") {
    spotifyThis();
} else if (command === "movie-this") {
    movieThis();
} else if (command === "do-what-it-says") {
    doThis();
}

//==================BANDS=========================

function concertThis(artistName) {
    // console.log("concertThis called")
    //Require axios
    var axios = require("axios");
    //After process.argv[2] store next inputs as parts of the name of the movie (1 or more words)
    var nodeArgs = process.argv;
    var artistName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if(i > 3 && i < nodeArgs.length) {
            artistName = artistName + nodeArgs[i];
            // console.log(artistName);
        } else {artistName = nodeArgs[i]
        }
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"
    
    axios.get(queryUrl)
    .then(function(response) {
        // console.log(response)
        console.log("------------CONCERT-------------")
        fs.appendFileSync("log.txt", "------------CONCERT INFO-------------\n");
        console.log(artistName.toLocaleUpperCase() + " CONCERTS")
        fs.appendFileSync("log.txt", artistName.toLocaleUpperCase() + " CONCERTS\n");
        var result = response.data
        if (result == 0) {
            console.log(artistName.toLocaleUpperCase() + " has no concerts scheduled.")
            fs.appendFileSync("log.txt", artistName.toLocaleUpperCase() + " has no concerts scheduled.\n");
        }
        
        for (var i=0; i < response.data.length; i++) {
            console.log(" ")
            fs.appendFileSync("log.txt",  " \n");
            console.log("Name of Venue: " + response.data[i].venue.name);
            fs.appendFileSync("log.txt", "Name of Venue: " + response.data[i].venue.name + "\n");
            console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            fs.appendFileSync("log.txt", "Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\n");
            var randomDate = response.data[i].datetime;
            console.log(randomDate);
            var randomFormat = "YYYY-MM-DDTHH:mm:ss";
            var convertedDate = moment(randomDate, randomFormat);
            console.log("Date of the event: " + convertedDate.format("MM/DD/YYYY"));
            fs.appendFileSync("log.txt", "Date of the event: " + convertedDate.format("MM/DD/YYYY") + "\n");
            
        }
        console.log("-------------------------------------")

    });
}

//================MOVIE=======================

function movieThis(movieName) {
    var axios = require("axios");

    var nodeArgs = process.argv;

    var movieName = "";

    if (process.argv[3] === undefined) {
        movieName = "mr+nobody";
    }

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
           } else {
            movieName = movieName + nodeArgs[i];
        }
    }

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
axios.get(queryUrl).then(
  function(response) {
      
            console.log("-------------MOVIE INFO---------------")
            fs.appendFileSync("log.txt", "------------MOVIE INFO-------------\n");
            console.log("Title of the movie: " + response.data.Title);
            fs.appendFileSync("log.txt", "Title of the movie: " + response.data.Title + "\n");
            console.log("Year the movie came out: " + response.data.Year);
            fs.appendFileSync("log.txt", "Year the movie came out: " + response.data.Year + "\n");
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            fs.appendFileSync("log.txt", "IMDB Rating of the movie: " + response.data.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\n");
            console.log("Country where the movie was produced: " + response.data.Country);
            fs.appendFileSync("log.txt", "Country where the movie was produced: " + response.data.Country + "\n");
            console.log("Language of the movie: " + response.data.Language);
            fs.appendFileSync("log.txt", "Language of the movie: " + response.data.Language + "\n");
            console.log("Plot of the movie: " + response.data.Plot);
            fs.appendFileSync("log.txt", "Plot of the movie: " + response.data.Plot + "\n");
            console.log("Actors in the movie: " + response.data.Actors);
            fs.appendFileSync("log.txt", "Actors in the movie: " + response.data.Actors + "\n");
            console.log("-------------------------------------")  
        }
    )
    }

//=================SPOTIFY======================

function spotifyThis(songName) {
    // console.log("spotifyThis called")
    var nodeArgs = process.argv;

    if (songName === undefined) {
        songName = "the sign ace of base";
    }
      
    if (process.argv[3]) {
        var songName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        
         if (i > 3 && i < nodeArgs.length) {
             
                songName = songName + " " + nodeArgs[i];
           } else if (i=3) {
            
            songName = songName + nodeArgs[i];
        }
    }
}
    spotify.search({ type: 'track', query: songName}, function(err, data) {
        if (err) {
          return console.log('Error: ' + err);
        }
        console.log("-----------SPOTIFY--------------")
        fs.appendFileSync("log.txt", "------------SPOTIFY-------------\n");
        console.log(songName.toLocaleUpperCase())
        fs.appendFileSync("log.txt", songName.toLocaleUpperCase() + "\n");

        for (var i = 0; i<data.tracks.items.length; i++) {
            for (var n = 0; n < data.tracks.items[i].artists.length; n++) {
                console.log(" ")
                fs.appendFileSync("log.txt",  " \n");
                console.log("Song's name: " + data.tracks.items[i].name)
                fs.appendFileSync("log.txt", "Song's name: " + data.tracks.items[i].name + "\n");
                console.log("Artist: " + data.tracks.items[i].artists[n].name);
                fs.appendFileSync("log.txt", "Artist: " + data.tracks.items[i].artists[n].name + "\n");
                console.log("Preview: " + data.tracks.items[i].preview_url)
                fs.appendFileSync("log.txt", "Preview: " + data.tracks.items[i].preview_url + "\n");
                console.log("Album: " + data.tracks.items[i].album.name)
                fs.appendFileSync("log.txt", "Album: " + data.tracks.items[i].album.name + "\n");
            
        }
        }
        console.log("-------------------------------------")
      });
    }

//====================DO THIS=====================

function doThis() {
    // console.log("check")

    fs.readFile("random.txt", "utf-8", function(error, data) {
		var command;
		var songName;

		if(data.indexOf(",") !== -1) {
			var random = data.split(",");
			command = random[0];
			songName = random[1];
		} else {
			command = data;
        }
        console.log(command);
        console.log(songName)

		if (command === "concert-this") {
            concertThis();
        } else if (command === "spotify-this-song") {
            spotifyThis(random[1]);
        } else if (command === "movie-this") {
            movieThis();
        }
	});
    
}