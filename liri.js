// LIRI Commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

//***************************************************************
// Functions
//***************************************************************

function myTweets(){ 
  var Twitter = require('twitter');
  // Read Twitter Keys
  var twitKeys = require('./keys.js');

  var client = new Twitter({
    consumer_key: twitKeys.twitterKeys.consumer_key,
    consumer_secret: twitKeys.twitterKeys.consumer_secret,
    access_token_key: twitKeys.twitterKeys.access_token_key,
    access_token_secret: twitKeys.twitterKeys.access_token_secret
  });

  var params = {screen_name: 'ChrisWahlers1'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      tweets.forEach(function(tweet){
        console.log(tweet.created_at);
        console.log(tweet.text);
      })
    }
  });
}

function spotifyThisSong(songInput){
  // Import Spotify API
  var spotify = require('spotify');
  spotify.search({type: 'track', query: songInput }, function(err, data){
    if (err){
      console.log('Error occured: ' + err);
      return;
    }
    // Output track
    console.log(data);
    //var output = JSON.stringify(data);
    //console.log(output);
  });  
}

function movieThis(movieInput){
  // Import OMDB API
  var omdb = require('omdb');
  
  omdb.search(movieInput, function(err, movies){
    if (err) {
      return console.error(err);
    }
    if (movies.length < 1){
      return console.log('No movies found!');
    }
    movies.forEach(function(movie){
      console.log('%s (%d)', movie.title, movie.year);
      console.log(movie.plot);
    })
  });  
}

function doWhatItSays(cmd, parameter){
  // Call function with the parameter
  console.log("Command: " + cmd + "Parameter: " + parameter)
  //cmd(parameter);
}

//***************************************************************
// Start Main Program
//***************************************************************

switch (process.argv[2]){
  case 'my-tweets':
  console.log('my-tweets');
  myTweets(process.argv[3]);
  break;

  case 'spotify-this-song':
  console.log('spotify-this-song: ' + process.argv[3]);
  spotifyThisSong(process.argv[3]);
  break;

  case 'movie-this':
  console.log('movie-this: ' + process.argv[3]);
  movieThis(process.argv[3]);
  break;

  case 'do-what-it-says':
  console.log('do-what-it-says');
  var fs = require('fs');
  fs.readFile('random.txt', 'utf-8', function( err, data ){
    var output = data.split(',');
    console.log(output);
    // for (var i = 0; i < output.length; i + 2) {
    //   console.log('Command: ' + output[i] + " Argument: " + output[i + 1]);
    //   doWhatItSays(output[i] , output[ i + 1 ]);
    // }
  });
  break;
}
