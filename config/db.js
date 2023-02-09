const mongoose = require("mongoose");

// connectDB function establishes a connection with the MongoDB database using the URL stored in the environment variable "MONGO_URL".
const connectDB = async () => {
  // mongoose.connect() returns a connection instance that is connected to the database.
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser and useUnifiedTopology are set to true to enable MongoDB driver's new connection URL and topology engines.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;

/* Notes: useNewUrlParser and useUnifiedTopology are options in the MongoDB Node.js driver that are 
used to configure the connection to the MongoDB database. 
useNewUrlParser option is used to enable the MongoDB driver's new URL parser, which provides improved 
reliability and security when connecting to the database. This option was introduced in the MongoDB Node.js 
driver version 3.0.0.
useUnifiedTopology option is used to enable the MongoDB driver's new topology engine, which provides 
improved performance, automatic server selection, and improved error handling. This option was introduced 
in the MongoDB Node.js driver version 3.0.0.
Setting both options to true ensures that the MongoDB driver uses the latest and most efficient technologies 
when connecting to the database. */
