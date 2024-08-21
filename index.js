const express = require('express');
const app = express();
const router = require('./routes/route')
require('dotenv').config();
const port = process.env.port;
const { con }  = require('./config/db');
const e = require('express');
con();

app.use(express.json());
app.use('/api',router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
