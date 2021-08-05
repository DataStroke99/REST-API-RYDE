const usersController = require('../../controllers/users.js')


// USERS

module.exports = function (app) {



	//Default home page
	app.get('/', usersController.home);




	// Create 
	app.post('/api/v1/users', usersController.create);




	// Read
	app.get('/api/v1/users', usersController.findAll); 
	app.get('/api/v1/users/:id', usersController.findOne);






	// Update
	app.put('/api/v1/users/:id', usersController.update);





	// Delete
	app.delete('/api/v1/users/:id', usersController.delete);





}
// --------------------------------------------------------------------------------








