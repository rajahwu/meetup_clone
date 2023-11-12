const { sequelize } = require('./db/models');

sequelize
  .showAllSchemas({ logging: false })
  .then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
      console.log(`Schema ${process.env.SCHEMA} not found. Creating...`);
      await sequelize.createSchema(process.env.SCHEMA);
      console.log(`Schema ${process.env.SCHEMA} created.`);
    } else {
      console.log(`Schema ${process.env.SCHEMA} already exists.`);
    }
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
