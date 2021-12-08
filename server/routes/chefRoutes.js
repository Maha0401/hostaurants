const router = require('express').Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const knex = require('knex')(require('../knexfile').development);
const fs = require('fs');

let requests = fs.readFileSync('./data/request.json');
requests = JSON.parse(requests);

let foods = fs.readFileSync('./data/book.json');
foods = JSON.parse(foods);

let chefUsers = [];

knex('chef')
.then((data) => { 
    chefUsers = data;
})
.catch((err) =>
    console.log('error getting data')
);

router.get('/foods/:chefId', (req,res) => {
    const filteresfoods = foods.filter(food => food.chefId === req.params.chefId);
    res.status(200).json(filteresfoods)
})

router.get('/requests', (req,res) => {
    res.status(200).json(requests);
})

router.get('/current', authorize, (req, res) => {
    // if valid token, continue
    const usernameFromToken = req.decoded.username;
    // find the user from users using username from the token
    const foundUser = chefUsers.find(user => user.chefUserName === usernameFromToken);
    
    if (!foundUser) {
        return res.status(400).json({
            message: "Unable to find user"
        })
    }

    // send back full user data 
    return res.json({
        username: foundUser.chefUserName,
        status:'chef'
    })
});

router.get('/:id', (req, res) => {
    knex('chef').where('id', req.params.id).then((response) => res.send(response))
})

router.put('/:id', (req, res) => {
    const {about} = req.body;
    knex('chef')
    .where({ 'id': req.params.id })
    .update({'about': about })
    .then((res)=>{

    })

  return res.status(200).send('ok')
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).json({
            message: "Login requires username and password fields"
        })
    }

    // username and password are provided
    const foundUser = chefUsers.find(user => user.chefUserName === username);

    if (!foundUser) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }

    // we are guaranteed to have the user here
    // Validate password matches user's password
    if (foundUser.chefPassword !== password) {
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
    );

    res.json({ 
        message: "Successfully logged in",
        token: token,
        id: foundUser.id
    });
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name


    if (!username || !password) {
        return res.status(400).json({
            message: "Register requires name, username, and password"
        })
    }

    // at this point, we are guaranteed to have a 
    // name, username, and password
    const newUser = {
        name: name,
        username: username,
        password: password
    };
    console.log(newUser)
    knex("chef").insert({name:newUser.name, chefUserName: newUser.username, chefPassword: newUser.password})
    .then((_result) => {
        knex('chef')
        .then((data) => { 
            chefUsers = data;
        })
     }) 
    res.sendStatus(200)
});

module.exports = router;