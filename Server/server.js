const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(cors());
const api = require('./routes/api')
app.use(bodyParser.json());

app.use('/api',api);

app.listen(3000, ()=>{
    console.log('server running at 3000')
})