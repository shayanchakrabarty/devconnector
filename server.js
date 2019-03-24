const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


//import all route file
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//DB Config
const db = require('./config/keys').mongoURI;

const app = express();

//config body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to mongodb
mongoose
	.connect(db)
	.then(() => { console.log(`Mongo DB connected successfully`)})
	.catch(err => { console.log(err)})

//passport initialize
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);




const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server Running at port ${port}`)});