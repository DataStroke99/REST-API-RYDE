const mongoose = require('mongoose');


// Define users Schema
const UserSchema = mongoose.Schema({
	id:      {type: Number, required: true},
	name:    {type: String, required: true},
	dob:     {type: String, required: true},
	address: {type: String, required: true},
	description:    String,
	createdAt:   Date,
},
{
	timestamp: true
});


const Users = mongoose.model('User', UserSchema);
module.exports = Users;