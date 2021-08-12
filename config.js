const dotenv = require('dotenv');
dotenv.config();

const configs = {
  	MONGODB_URI: `mongodb+srv://${process.env.MONGO_DB_USER}@${process.env.MONGO_DB}.rd3yy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
};

module.exports = configs;