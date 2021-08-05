const Users = require('../models/usersSchema.js');
var bodyParser = require('body-parser')    
var jsonParser = bodyParser.json();

exports.home = (req, res) => {
    res.send("Hello World");
};

/*
{
"id": 5,
"name":"Kanye,
"dob":"13/11/1999",
"address":"15 Jalan Asas",
"description":"User Test"
} 
*/
/*


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"id": 5,"name":"Kanye","dob":"13/11/1999","address":"15 Jalan Asas","description":"User Test"}' \
  http://localhost:3000/api/v1/users




curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:3000/api/v1/users

  curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:3000/api/v1/users/2






curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"id": 5,"name":"Kanye","dob":"13/11/1999","address":"15 Jalan Asas","description":"User Test"}' \
  http://localhost:3000/api/v1/users



curl --header "Content-Type: application/json" \
  --request DELETE \
  http://localhost:3000/api/v1/users/2
*/




// POST
// Create a new User
exports.create = (req, res) => {
 

    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User data cannot be empty"
        });
    }

    




    // Get 
    let last_id = 0

    Users.find()
    .then(user => {
        if (user.length == 0){

            last_id = 0

            // Create a User
            const user = new Users({
                id:      last_id+1 ,
                name:    req.body.name,
                dob:     req.body.dob,
                address: req.body.address,
                description:  req.body.description,
                createdAt : new Date
            });

       
            //Add and save new User data in the database
            user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while creating the User"
                });
            });
    




        }else{


        Users.find().sort({id: -1}).limit(1)
        .then(function(doc) {

            last_id = doc[0].id 

            // Create a User
            const user = new Users({
                id:      last_id+1 ,
                name:    req.body.name,
                dob:     req.body.dob,
                address: req.body.address,
                description:  req.body.description,
                createdAt : new Date
            });

       
            //Add and save new User data in the database
            user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while creating the User"
                });
            });
    


      },
      function(err) {
        console.log('Error:', err);
      }
    );



        }





    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User data"
        });
    });
    



    



};





// GET
// Retrieve all User data from the database
exports.findAll = (req, res) => {



    Users.find()//.skip(offset).limit(limit).sort();
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User data"
        });
    });


};

// GET
// Find a single User with the ID
exports.findOne = (req, res) => {


    Users.find({'id':req.params.id})
    .then(user => {

     
        if(!user || user.length==0) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);


    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });





};






// PUT
// Update User Data
exports.update = (req, res) => {


    // Check for error in request
    if(!req.body) {
        return res.status(400).send({
            message: "User data cannot be empty"
        });
    }



    Users.findOneAndUpdate({'id':req.params.id}, {
        id:      req.params.id,
        name:    req.body.name,
        dob:     req.body.dob,
        address: req.body.address,
        description:  req.body.description,



    }, {new: true})
    .then(user => {
        if(!user) {
               
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.id
        });
    });
};







// DELETE
// Delete a User by ID
exports.delete = (req, res) => {
    Users.findOneAndRemove({'id':req.params.id})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "Users deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Users not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete users with id " + req.params.id
        });
    });
};




