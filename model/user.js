const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for passwords

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      email: {
         type: String,
         required: true
      },
      userName: {
         type: String,
         required: true
      },
      
      password: {
         type: String,
         required: true
      },
      password2: {
         type: String,
         required: true
      },
      date: {
         type: Date,
         default: Date.now
      }

});
mongoose.model('users', UsersSchema);