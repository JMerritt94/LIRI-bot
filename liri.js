require("dotenv").config();

var nodeArgs = process.argv;

var keys = require('./keys')

var moment = require('moment');

var request = require("request");

var searchType = process.argv[2];
const fs = require('fs');


var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.Spotify)

// console.log(spotify)
var searchContent=process.argv.slice(3)
// var searchJoin=searchContent.join("")

console.log(searchContent)




spotifySearch = function (searchContent) {


    // songName = "";
    // for (var i = 3; i < nodeArgs.length; i++) {

    //     if (i > 3 && i < nodeArgs.length) {

    //         songName = songName + "+" + nodeArgs[i];

    //     }

    //     else {

    //         songName += nodeArgs[i];

    //     }
    // }




    spotify.search({ type: 'track', query: searchContent, limit: "20" })
        .then(function (response) {
            songData = response.tracks.items

            for (i = 0; i < songData.length; i++) {

                var art = "Artist(s): " + songData[i].album.artists[0].name
                var sng = "Song Name: " + songData[i].name
                var lnk = "Link to Song: " + songData[i].album.external_urls.spotify
                var albm = "Album: " + songData[i].album.name
                // console.log(i)
                // console.log(art)
                // console.log(sng)
                // console.log(lnk)
                // console.log(albm)

                printThis = i + "\r\n" + art + "\r\n" + sng + "\r\n" + lnk + "\r\n" + albm + "\r\n" + ""
                console.log(printThis)
            }



        });


}

movieSearch = function (searchContent) {

    // var movieName = "";
    // for (var i = 3; i < nodeArgs.length; i++) {

    //     if (i > 3 && i < nodeArgs.length) {

    //         movieName = movieName + "+" + nodeArgs[i];

    //     }

    //     else {

    //         movieName += nodeArgs[i];

    //     }
    // }


    request("http://www.omdbapi.com/?t=" + searchContent + "&y=&plot=short&apikey=trilogy", function (error, response, body) {


        if (!error && response.statusCode === 200) {

            var jsonData = JSON.parse(body);
            var movieData =
                [
                    "Title: " + jsonData.Title,
                    "Year: " + jsonData.Year,
                    "Imbd rating: " + jsonData.imdbRating,
                    "Country Filmed in: " + jsonData.Country,
                    "Language: " + jsonData.Language,
                    "Plot: " + jsonData.Plot,
                    "Actors: " + jsonData.Actors

                ]
            console.log(movieData)
            //  console.log("Title:" + JSON.parse(body).Title)
            // console.log("Year:"+JSON.parse(body).Year)
            // // console.log("Title:"+JSON.stringify(response.Rating[1].Value))
            // console.log("The movie's rating is: " + JSON.parse(body).imdbRating)
            // console.log("Country Filmed in:"+JSON.parse(body).Country)
            // // console.log(response.body.Title)
            // console.log("Language:"+JSON.parse(body).Language)
            // console.log("Plot:"+JSON.parse(body).Plot)
            // console.log("Actors:"+JSON.parse(body).Actors)
        }
    });

}

concertSearch = function (searchContent) {
console.log(searchContent)
// var searchJoin=searchContent.join("")


    // var bandName = "";
    // for (var i = 3; i < nodeArgs.length; i++) {

    //     if (i > 3 && i < nodeArgs.length) {

    //         bandName = bandName + "%20" + nodeArgs[i];

    //     }

    //     else {

    //         bandName += nodeArgs[i];

    //     }

    // }
    // console.log(bandName)
    // var bandName=searchContent.split(" ")
    // addSpace(){

    //  for (var i = 3; i < nodeArgs.length; i++) {

    //     if (i > 3 && i < nodeArgs.length) {

    //         bandName = bandName + "%20" + nodeArgs[i];

    //     }

    //     else {

    //         bandName += nodeArgs[i];

    //     }

    // }}
    // console.log(bandName)



    request("https://rest.bandsintown.com/artists/" + searchContent + "/events?app_id=5d529be63a91e6431fc23cc57e36b35c", function (error, response, body) {

        jsonData = JSON.parse(body)
        for (i = 0; i < jsonData.length; i++) {

            console.log(jsonData[i].venue.name)
            console.log(jsonData[i].venue.city)
            console.log(moment(jsonData[i].datetime).format('DD/MM/YYYY'))
            console.log
        }
    })
}

// var concertData=[
// "venue name: "+jsonData.name,
// "venue city: "+jsonData.city,
// "concert time: "+ moment.format(jsonData.datetime)



// console.log(concertData)





function finalFunction(searchContent) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var holder = data.split(",");
        searchType = holder[0];
        searchContent = holder[1];
        console.log(searchType)
       
        if (searchType === "concert-this") {
            concertSearch(searchContent);
        }
        else if (searchType === "spotify-this-song") {
            spotifySearch(searchContent);
        }
        else if (searchType === "movie-this") {
            movieSearch(searchContent);
        }
    })
}






runLiri = function () {
    if (searchType === "concert-this") {
        var searchJoin=searchContent.join("")
        concertSearch(searchJoin);
    }
    else if (searchType === "spotify-this-song") {
        spotifySearch(searchContent);
    }
    else if (searchType === "movie-this") {
        movieSearch(searchContent);
    }
    else if (searchType === "do-what-it-says") {
        finalFunction(searchContent);
    }

}

runLiri();