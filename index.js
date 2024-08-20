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


// (async () => {
//     await sequelize.sync(); 
//     try {
//         await Employee.create({
//             firstName: 'Talha',
//             lastName: 'Saeed',
//             age: 45,
//             department: 'dev_c',
//         });
//         console.log('Employee record created successfully.');
//     } catch (error) {
//         console.error('Error creating employee record:', error);
//     }
// })();

// (async () => {
//     await sequelize.sync();
//     try {
//         const records = await Employee.findAll();
//         console.log('Records', records)
//     }
//     catch ( error ) {
//         console.log('Error while fetching records', error)
//     }
// })();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
