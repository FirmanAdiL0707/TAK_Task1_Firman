const request_url = require("supertest")("https://restful-booker.herokuapp.com");
const assert = require("chai").expect;
const userdata = require('../testdata/bookingdata.json');


describe('Post create booking', function() {
	it('should successfully pass the test for post create booking', async function() {
		
		const response = await request_url
			.post("/booking")
			.send(userdata)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json');
			console.log(userdata.firstname)
		assert(response.statusCode).to.eql(200);
		assert(response.body.booking.firstname).to.eql("Firman");
		assert(response.body.booking.lastname).to.eql("Adi Laksana");
		assert(response.body.booking.bookingdates.checkin).to.eql("2023-09-28")
		assert(response.body.booking.bookingdates.checkout).to.eql("2023-09-29")
	});
});

describe('Get booking', function() {
	var response;
	it('should successfully get booking data', async function() {
		
		response = await request_url
			.get("/booking?firstname=Firman")
			.send()
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json');
		assert(response.statusCode).to.eql(200);
	});

	it('should successfully get booking data with ID', async function() {
		
		const response_withid = await request_url
			.get("/booking/"+response.body[0].bookingid)
			.send()
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json');
		assert(response_withid.statusCode).to.eql(200);
		assert(response_withid.body.firstname).to.eql("Firman");
		assert(response_withid.body.lastname).contains("Adi Laksana");
	});
});

// describe('Get booking with ID', function() {
	
// });