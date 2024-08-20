const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')
const Tasks = sequelize.define(
    'tasks',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    }
);

// Sync the model with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Tasks table created successfully!');
//     })
//     .catch(err => {
//         console.error('Unable to create the table:', err);
//     });

module.exports = Tasks;