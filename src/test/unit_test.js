const chai = require("chai")
const server = require("../index.js")
const chaiHttp = require("chai-http")

// Assertion style
chai.should()
chai.use(chaiHttp)


describe('Tasks API' ,()=>{

	/*
	*  Test GET 
	*/

	describe("GET /api/v1/users" , ()=>{
		it("It should GET all the User data", (done)=>{
			chai.request(server).get('/api/v1/users').end((err, response)=>{
				response.should.have.status(200)
				response.body.should.be.a('array')
			done();
			})
		})




		it("It should NOT GET all the User data", (done)=>{
			chai.request(server).get('/api/v1/user').end((err, response)=>{
				response.should.have.status(404)
			done();
			})
		})
	})







	/*
	*  Test GET (by id)
	*/

	describe("GET /api/v1/users/:id" , ()=>{

		it("It should GET User data by ID", (done)=>{
			const user_id = 2
			chai.request(server).get('/api/v1/users/'+user_id).end((err, response)=>{
				response.should.have.status(200)
				response.body.should.be.a('array')

			done();
			})
			})



		it("It should not GET User data by ID", (done)=>{
		const user_id = 567
		chai.request(server).get('/api/v1/users/'+user_id).end((err, response)=>{
			response.should.have.status(404)
		done();
		})


		})

})





	/*
	*  Test POST
	*/

describe("POST /api/v1/users" , ()=>{

		it("It should POST User data", (done)=>{
			const user  = {
						"id": 10,
						"name":"Test User",
						"dob":"13/11/1999",
						"address":"Orchard",
						"description":"User Test Description"
			};

			chai.request(server).post('/api/v1/users').send(user).end((err, response)=>{
				response.should.have.status(200)
				response.body.should.be.a('object')
				response.body.should.have.property('id').eq(10)
				response.body.should.have.property('name').eq('Test User')
				response.body.should.have.property('dob').eq('13/11/1999')
				response.body.should.have.property('address').eq('Orchard')
				response.body.should.have.property('description').eq('User Test Description')
			done();

			})
	

		})






		it("It should NOT POST User data without the name property", (done)=>{
			const user  = {
						"id": 10,
						"dob":"13/11/1999",
						"address":"Orchard",
						"description":"User Test Description"
			};
			chai.request(server).post('/api/v1/users').send(user).end((err, response)=>{
				response.should.have.status(500)
			done();

			})


	})

})


	/*
	*  Test PUT
	*/

describe("PUT /api/v1/users/:id" , ()=>{

		it("It should PUT User data", (done)=>{
			const user_id = 2
			const user  = {
						"id": user_id,
						"name":"Test User Changed",
						"dob":"13/11/1999",
						"address":"Orchard",
						"description":"User Test Description 2"
			};

			chai.request(server).put('/api/v1/users/'+user_id).send(user).end((err, response)=>{
				response.should.have.status(200)
				response.body.should.be.a('object')
				response.body.should.have.property('id').eq(2)
				response.body.should.have.property('name').eq('Test User Changed')
				response.body.should.have.property('dob').eq('13/11/1999')
				response.body.should.have.property('address').eq('Orchard')
				response.body.should.have.property('description').eq('User Test Description 2')
			done();

			})
	

		})






		it("It should NOT PUT User data with wrong id", (done)=>{
			const user_id = 200
			const user  = {
						"id": user_id,
						"name":"Test User Changed",
						"dob":"13/11/1999",
						"address":"Orchard",
						"description":"User Test Description 2"
			};

			chai.request(server).put('/api/v1/users/'+user_id).send(user).end((err, response)=>{
				response.should.have.status(404)

			done();

			})
	

		})






})






	/*
	*  Test DELETE
	*/


describe("DELETE /api/v1/users/:id" , ()=>{

		it("It should DELETE an existing User data", (done)=>{
			const user_id = 10

			chai.request(server).delete('/api/v1/users/'+user_id).end((err, response)=>{
				response.should.have.status(200)

			done();

			})
	

		})


		it("It should NOT DELETE User data with wrong id", (done)=>{
			const user_id = 200

			chai.request(server).delete('/api/v1/users/'+user_id).end((err, response)=>{
				response.should.have.status(404)

			done();

			})
	

		})





})















})




