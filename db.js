const mongoose = require('mongoose');
const cfg = require('./config.js');

mongoose.connect(cfg.MONGODB_URI,{
   useCreateIndex: true,
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true             
   }).then(db=>console.log('The DataBase is connected'))
     .catch(err=>console.log(err));
