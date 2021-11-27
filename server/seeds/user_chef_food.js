const chefData = require('./seed_data/chef');
const foodData = require('./seed_data/food');
const userData = require('./seed_data/user');

exports.seed = function (knex) {
    return knex('user')
    .del()
    .then(function () {
      return knex('user').insert(userData);
    })
    .then(() => {
      return knex('chef').del();
    })
    .then(() => {
      return knex('chef').insert(chefData);
    })
    .then(() => {
      return knex('food').del();
    })
    .then(() => {
      return knex('food').insert(foodData);
    });
};
