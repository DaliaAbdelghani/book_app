'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
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
  res.sendFile('new.ejs');
});

// book constructor

function Book (data){
  
}
