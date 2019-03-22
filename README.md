# LiriNodeHomework
REQUIREMENTS
- built a node.js app that receives inputs from the terminal 
- use "Bands In Town", "Spotify" and "OMDB" APIs to feed the app with information
- use npm to access those API's

TECHNOLOGIES 
- Javascript
- Node.js
- Spotify API
- Bands in Town API
- OMDB API
- npm Axios 
- npm moment
- npm fs
- npm node-spotify-api
- npm dotenv (to hide key files)

CODE EXPLANATION
- authentication keys for Spotify are stored in keys'js and are exporting its contents to the main liri.js file
- the inputs from the terminal will determine which function will be called and which information will be requested from the API's
        $ node liri.js concert-this <name of artist> //will call a function that will use axios to get data from "Bands in Town" API and give the user the venue, location and date of the artist's concerts coming up. In this case, the date is converted to format MM/DD/YYYY using moment npm
        $ node liri.js movie-this <name of movie> //will call a function that will use axios to get data from "OMDB" API and give the user the some information about the typed movie. If the command is given, but no movie name, the default movie for this situation will be "Mr Nobody"
        $ node liri.js spotify-this-song <name of song> //will call a function that will use npm node-spotify-api to get data from Spotify API. If the command is given and no name of song, then the default song for this situation will be "The Sign" by Ace of Base. Otherwise the command line will take names with 1 or more words to request to spotify api. The user receives information about the song, album and a preview url. All options of songs with that name are given to the user, so he/she can choose his/her favorite. 
        $ node liri.js do-what-it-says // this command can call any function that is written in the file random.txt file. In this assignment the command is "spotify-this-song" and the song is "I Want It That Way" 
        
    VIDEO DEMO
   https://drive.google.com/file/d/1_ECLEZeRQ89LV8Hd62ufjjWONutKccz7/view?usp=sharing
   
   
   
   
   
   
   
        
        


