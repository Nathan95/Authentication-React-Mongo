const mongoose = require('mongoose');
consr Schema = mongoose.Schema;


//Define our model
const userSchema = newSchema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

//Create the model class
const ModelClass = mongoose.model('user', userSchema);


//Export the model
module.exports = ModelClass;
