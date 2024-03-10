// server/middlewares/index.middleware.js

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const middlewares = {};

fs.readdirSync(__dirname)
.filter(file => {
    return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.middleware.js') !== -1
        );
    })
.forEach(file => {
    const controller = require(path.join(__dirname, file));
    const name = file.replace('.middleware.js', '');
    middlewares[name] = controller;
});

module.exports = middlewares;
