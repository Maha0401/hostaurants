const router = require("express").Router();
const knex = require('knex')(require('../knexfile').development);

let foodList = []

knex("food")
.then((data) => {
    foodList = data;
})
.catch((err) => res.status(400).send(`Error retrieving foods: ${err}`))


router.route("/")
    .get((req,res) =>{
        res.json(foodList);
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
