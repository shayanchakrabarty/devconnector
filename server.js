const express = require('express');
const mongoose = require('mongoose');


//import all route file
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//DB Config
const db = require('./config/keys').mongoURI;

const app = express();


//Connect to mongodb
mongoose
	.connect(db)
	.then(() => { console.log(`Mongo DB connected successfully`)})
	.catch(err => { console.log(err)})

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);




const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server Running at port ${port}`)});