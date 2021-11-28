const router = require('express').Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const knex = require('knex')(require('../knexfile').development);

let users = [];

knex('user')
.then((data) => { 
    users = data;
})
.catch((err) =>
    console.log('error getting data')
);

router.get('/current', authorize, (req, res) => {
    console.log("req.decoded in /users/current route", req.decoded);
    // if valid token, continue
    const usernameFromToken = req.decoded.username;
    // find the user from users using username from the token
    const foundUser = users.find(user => user.userName === usernameFromToken);
    
    if (!foundUser) {
        return res.status(400).json({
            message: "Unable to find user"
        })
    }

    // send back full user data 
    return res.json({
        username: foundUser.userName,
    })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).json({
            message: "Login requires username and password fields"
        })
    }

    // username and password are provided
    const foundUser = users.find(user => user.userName === username);

    if (!foundUser) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }

    // we are guaranteed to have the user here
    // Validate password matches user's password
    if (foundUser.password !== password) {
        // invalid password, return response
        return res.status(400).json({
            message: "Invalid Credentials, password does not match"
        })
    }

    // it is a valid password at this point, 
    // create and return JWT
    const token = jwt.sign(
        // 1. payload
        { username: username },
        // 2. secret key
        process.env.JWT_SECRET_KEY,
        // 3. options
        //{ expiresIn: "1h" }
    );

    res.json({ 
        message: "Successfully logged in",
        token: token 
    });
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Register requires name, username, and password"
        })
    }

    // at this point, we are guaranteed to have a 
    // name, username, and password
    const newUser = {
        username: username,
        password: password
    };

    knex("user").insert({userName: newUser.username, password: newUser.password})
    .then((_result) => {
        knex('user')
        .then((data) => { 
            users = data;
        })
     }) 
    res.sendStatus(200);
});

module.exports = router;