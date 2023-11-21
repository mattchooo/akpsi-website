const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'akpsi-database', 
    'root', 
    'Sample2347$',
    {dialect: 'mysql', host: 'localhost'}
);

sequelize.authenticate().then(() => {
    console.log("Connection successful!");
}).catch((err) => {
    console.log("Error connecting to database.");
});

console.log("Another task.");

module.exports = sequelize;