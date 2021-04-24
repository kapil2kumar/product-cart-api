

const db = require('./entities');
const logger = require('./logger');
const {defaultUser,defaultProduct} = require('./config/setting');

return db.sequelize.authenticate()
    .then(result => {
        logger.info(`Database successfully connected!`);
        return 1
    }).then((result) => {
        logger.info("Drop and re-sync db.");
        return db.sequelize.sync({ force: true })
        // return db.sequelize.sync();
    }).then((result) => {
        logger.info("Insert Default values in users table");
        return db.users.bulkCreate(defaultUser);
    })
    .then((result) => {
        logger.info("Insert Default values in products table");
        return db.products.bulkCreate(defaultProduct);
    })
    .catch(error => {
        logger.error('Unable to connect to database:', error);
    })
