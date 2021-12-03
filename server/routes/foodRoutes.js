const router = require("express").Router();
const knex = require('knex')(require('../knexfile').development);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let foodRequestList = fs.readFileSync('./data/request.json');
foodRequestList = JSON.parse(foodRequestList);

let foodList = []

knex("food")
.then((data) => {
    foodList = data;
})
.catch((err) => res.status(400).send(`Error retrieving foods: ${err}`))


router.route("/")
    .get((req,res) =>{
        res.json(foodList);
    })
    .post((req,res)=> {
        const { name, description, username } =req.body;

        if(name.trim()===""){
            return res
                    .status(404)
                    .json(`Please enter title and description in request body`)
        }

        foodRequestList.push({
            id: uuidv4(),
            name,
            description,
            username,
            chefname: ''
        })
        fs.writeFileSync('./data/request.json', JSON.stringify(foodRequestList));
        res
            .status(201)
            .json(foodRequestList);
    });

router.route("/search/:searchquery").get((req,res)=>{
    let filteredFood = foodList.filter(food=> food.name.toLowerCase().includes(req.params.searchquery))
    res.json(filteredFood);
});

router.route("/cuisine/:searchquery").get((req,res)=>{
    let filteredFood = foodList.filter(food=> food.cuisine.toLowerCase().includes(req.params.searchquery))
    res.json(filteredFood);
});

module.exports = router;
