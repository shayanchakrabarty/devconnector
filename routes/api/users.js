const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');


//load The model "User"
const User = require('../../models/User');
let errors = {};

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users Works'}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email })
			.then(user => {
				if(user) {
					errors.email = 'Email is already exists';
					return res.status(400).json(errors);
				} else {
					const avatar = gravatar.url(req.body.email, {
						s: '200', // Size
						r: 'pg', // Rating
						d: 'mm' // Default
					});

					const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password,
						avatar: avatar
					});

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err) throw err;
							newUser.password = hash;
							newUser
								.save()
								.then(user => res.json(user))
								.catch(err => console.log(err));
						});
					});
				}
			});
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email })
		.then(user => {
			if(!user) {
				errors.email = "User Not Found";
				return res.status(404).json(errors);
			}

			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch) {
						// User Matched
						// return res.status(200).json({ msg: "Success" });
						// create a payload i.e the data that can be used after sign "user" to create token
						const payload = { id: user.id, name: user.name, avatar: user.avatar } //JWT payload

						// Sign In Token
						jwt.sign(
							payload,
							keys.secretOrKey,
							{ expiresIn: 3600 },
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							}
						);

					} else {
						errors.password = "Password Incorrect";
						return res.status(404).json(errors);
					}

				}); 
		});

});


module.exports = router;