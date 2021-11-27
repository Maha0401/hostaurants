const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 9000;
 
app.use(express.json())
app.use(express.static('public'))


app.listen(PORT, ()=> {
    console.log(`running at http://localhost:${PORT}`);
})