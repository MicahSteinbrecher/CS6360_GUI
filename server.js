const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const postgres = require('postgres')
const bodyParser = require("body-parser");




app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/addcontact', async (req, res) => {

	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})

	console.log('add contacts fired: ')
	console.log(JSON.stringify(req.body))
	name = req.body.contact.name
	addresses = req.body.contact.addresses
	numbers = req.body.contact.numbers
	dates = req.body.contact.dates


	let contact = await sql`
	  INSERT INTO contact(fname, mname, lname)
		VALUES (${name.fname}, ${name.mname}, ${name.lname})
		RETURNING *
	`

	let id = contact[0].contact_id
	console.log(id)



	for (var i = 0; i < addresses.length; i++) {
		a = addresses[i]
		await sql`
		  INSERT INTO address(contact_id, address_type, address, city, state, zip)
			VALUES (${id}, ${a.address_type}, ${a.address}, ${a.city}, ${a.state}, ${a.zip})
		`
	}

	for (var i = 0; i < numbers.length; i++) {
		p = numbers[i]
		await sql`
		  INSERT INTO phone(contact_id, phone_type, area_code, number)
			VALUES (${id}, ${p.phone_type}, ${p.area_code}, ${p.number})
		`
	}

	for (var i = 0; i < dates.length; i++) {
		d = dates[i]
		await sql`
		  INSERT INTO date(contact_id, date_type, date)
			VALUES (${id}, ${d.date_type}, ${d.date})
		`
	}

})

app.post('/editcontact', async (req, res) => {

	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})

	console.log('edit contacts fired: ')
	console.log(JSON.stringify(req.body))
	
	contact = req.body.contact.contact
	addresses = req.body.contact.addresses
	numbers = req.body.contact.numbers
	dates = req.body.contact.dates

	let id = contact.contact_id
	console.log(id)

	await sql`
		UPDATE contact
		SET fname = ${name.fname},
		    mname = ${name.mname},
		    lname = ${name.lname}
		    WHERE contact_id=id;
	`

	for (var i = 0; i < addresses.length; i++) {
		a = addresses[i]

		if (a.address_id != null) {
			await sql`
				UPDATE contact
				SET address_type = ${a.address_type},
				    address = ${a.address},
				    city = ${a.city},
				    state = ${a.state},
				    zip = ${a.zip}
				    WHERE contact_id=id;
			`
		} else {
			await sql`
			  INSERT INTO address(contact_id, address_type, address, city, state, zip)
				VALUES (${id}, ${a.address_type}, ${a.address}, ${a.city}, ${a.state}, ${a.zip})
			`
		}
	}

	for (var i = 0; i < numbers.length; i++) {
		p = numbers[i]

		if (p.phone_id != null) {
			await sql`
				UPDATE phone
				SET phone_type = ${p.phone_type},
				    area_code = ${p.area_code},
				    number = ${p.number}
				    WHERE contact_id=id;
			`
		} else {

			await sql`
				INSERT INTO phone(contact_id, phone_type, area_code, number)
				VALUES (${id}, ${p.phone_type}, ${p.area_code}, ${p.number})
			`
		}
	}

	for (var i = 0; i < dates.length; i++) {
		d = dates[i]

		if (d.date_id != null) {
			await sql`
				UPDATE date
				SET date_type = ${d.date_type},
				    date = ${d.date}
				    WHERE contact_id=id;
			`
		}
		else {
			await sql`
				INSERT INTO date(contact_id, date_type, date)
				VALUES (${id}, ${d.date_type}, ${d.date})
			`
		}
	}

	res.json({ message: 'good' });


})

app.get('/getcontacts', async (req, res) => {

	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})

	let contacts = await sql`
	  select * from contact ORDER BY lname, fname

	`
  	res.json({ contacts: contacts });

})

app.delete('/deletecontact', async (req, res) => {

	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})

	id = req.query.id
	console.log('delete c fired')

	await sql`
				delete from date
				where contact_id=${id}
			`

	await sql`
			delete from address
			where contact_id=${id}
		`

	await sql`
			delete from phone
			where contact_id=${id}
		`
	
	await sql`
			delete from contact
			where contact_id=${id}
		`
	console.log('deleted contact')

	res.json({ msg: 'success' });

})

app.get('/searchcontacts', async (req, res) => {

	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})



	
	input = req.query.input.split(", ")
	console.log("input: ")
	console.log(input)

	let contacts = await contactSearch(input)
	console.log('finished search, found contacts: ')
	console.log(contacts)




	res.json({ contacts: contacts });


})

async function contactSearch(inputs) {
	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})

	ids = []
	contacts = []

	for (var i = 0; i < inputs.length; i++) {
		let isNum = /^\d+$/.test(input[i]);




		if (!isNum) {
			console.log('fire')

			input = inputs[i].toLowerCase();
			//search contacts by string columns
			let result = await sql`
				select distinct contact_id 
				from contact where
				fname = ${input} or
				mname = ${input} or
				lname = ${input}
			`

			ids.push(...result)

			//search address by string columns
			result = await sql`
				select distinct contact_id 
				from address
				where
				address = ${input} or
				city = ${input} or
				state = ${input} 
			`

			ids.push(...result)




		}

		else {


			//search address by int columns
			let result = await sql`
				select distinct contact_id 
				from address 
				where
				zip = ${input} 
			`

			ids.push(...result)



			//search phone by int columns
			result = await sql`
				select distinct contact_id 
				from phone 
				where
				area_code = ${input} or
				number = ${input}
			`
			console.log('result')


			console.log(result)
			ids.push(...result)

		}
	}

	ids = [...new Set(ids)];


	for (var i = 0; i < ids.length; i++) {
	    result = await sql`
			select * 
			from contact where
			contact_id = ${ids[i].contact_id}
		`
		contacts.push(result[0])
	}

	return contacts
	

}

app.get('/getContactByID', async (req, res) => {

	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})

	let id = req.query.id
	console.log("getContactByID fired with input id: " + id)

	let contact = await sql`
		select * 
		from contact where
		contact_id = ${id}
	`
	let addresses = await sql`
		select * 
		from address where
		contact_id = ${id}
	`
	let numbers = await sql`
		select * 
		from phone where
		contact_id = ${id}
	`

	let dates = await sql`
		select * 
		from date where
		contact_id = ${id}
	`
	console.log(contact)
	console.log(addresses)
	console.log(numbers)
	console.log(dates)

	let friend = {
		'contact': contact[0],
		'addresses': addresses,
		'numbers': numbers,
		'dates': dates
	}



	res.json({ contact: friend });


})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})