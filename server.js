'use strict';


const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// testing the app. before entering data
app.get ('/index',(req,res) =>{
  res.send('HELLO');
});

// the search route
app.get ('/searches/new',(req, res)=> {
  res.render('pages/searches/new');
});


// book constructor

function Book(data) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = data.title || 'No title available';
  this.author = data.author;
  this.description = data.description;
  this.img = placeholderImage;
  console.log(data);
}


// finding the volume ID in the id URL parameter e.g->https://books.google.com/ebooks?id=<%id%>=holmes&as_brr=4&source=webstore_bookcard
/* perform a volumes search by sending an HTTP GET request to the following URI
https://www.googleapis.com/books/v1/volumes?q=<%search%>+<%terms%>*/


app.post('/searches', handleSearch);

function handleSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`;}
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`;}
  superagent.get(url)
    .then(element => element.body.items.map(book => new Book(book.volumeData)))
    .then(results => res.render('pages/searches/show', { searchResults: results }))
    .catch(error => {
      handleError(req, res, error);
    });
}


app.get('/', handleHome);
app.get('/hello', handleWelcome);
app.get('*', handleError);


function handleWelcome (req, res) {
  try {
    res.status(200).send(`Oops, something didn't go wrong => ${april_fool}`);
  } catch(error) {
    res.status(500).send(`Oops, something went wrong => ${error}`);
  }
}
function handleHome(req, res) {
  res.render('pages/index');
}


function handleError(req, res, error){
  res.render('pages/error',{status:404, message:`Sorry some thing went wrong => ${error}`});
}
