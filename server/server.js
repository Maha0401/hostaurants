const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile').development);
require('dotenv').config();
const PORT = process.env.PORT || 9000;
const cors = require('cors')
app.use(cors());
 
app.use(express.json())
app.use(express.static('public'))

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const chefRoutes = require('./routes/chefRoutes');
app.use('/chef', chefRoutes);

const foodRoutes = require('./routes/foodRoutes');
app.use('/food', foodRoutes);

app.listen(PORT, ()=> {
    console.log(`running at http://localhost:${PORT}`);
})