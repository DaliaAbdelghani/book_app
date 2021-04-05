'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('./public'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.set('view engine', 'ejs');

// testing the app. before entering data
app.get ('/index',(req, res)=>{
  res.send('HELLO');
});

// the search route
app.get ('/searches/new',(req, res)=>{
  res.sendFile('new.ejs', { root: 'views' });
});

// book constructor

function Book (data){
  this.image=image;
  this.title=title;
  this.author=author;
  this.description=description;
}

// finding the volume ID in the id URL parameter e.g->https://books.google.com/ebooks?id=<%id%>=holmes&as_brr=4&source=webstore_bookcard
/* perform a volumes search by sending an HTTP GET request to the following URI
https://www.googleapis.com/books/v1/volumes?q=<%search%>+<%terms%>*/
let book = new Book();
superagent.post('/searches')
  .send(book)
  .end(function(err, response) {
    //upload done!
  });
