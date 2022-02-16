const express = require("express");
const app = express();

app.use(express.static('public'))
app.use('/css', express.static(__dirname +'public/css'));

app.set('view engine', 'ejs');
app.set('views', './views');


let Parser = require('rss-parser');
let parser = new Parser();
let latestTen = [];
(async () => {
    let feed = await parser.parseURL('https://www.di.se/rss');
    latestTen = feed.items.slice(0,10)

  })();

app.get('/', (req, res)=>{
      res.render('website', {
          latestTen : latestTen
      });

});


app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});
