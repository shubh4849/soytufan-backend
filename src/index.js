const app = require('./app')
const config = require("./config/config")
const logger = require('./config/logger');
const mongoose = require("mongoose");
const Category = require('./models/category.model');
let server;

mongoose.connect(config.mongoose.url,config.mongoose.options).then(()=>{
    console.log("Connected to mongodb");
    if (config.insertDummyCategories) {
      // Define your dummy categories data
      const dummyCategories = [
        {
          name: 'Category 5',
          description: 'Description for Category 5',
        },
        {
          name: 'Category 6',
          description: 'Description for Category 6',
        },
        // Add more categories as needed
      ];
    
      // Insert dummy categories into the database
      Category.insertMany(dummyCategories)
        .then(() => {
          console.log('Dummy categories inserted successfully');
        })
        .catch((error) => {
          console.error('Error inserting dummy categories:', error);
        });
    }
}).catch((err)=>{
    console.log(err)
});


app.listen(config.port, () => {
    console.log(`Soytufan app listening on port ${config.port}!`)
});


// ------------- Don't Modify  -------------
const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };
  
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
  // ------------- Don't Modify  -------------
  