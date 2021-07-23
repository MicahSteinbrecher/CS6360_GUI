const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const postgres = require('postgres')



app.use(cors());
app.options('*', cors());

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

app.get('/searchcontacts', async (req, res) => {

	const sql = postgres({
	  database	  : 'contact_list',
	  host        : 'localhost',         // Postgres ip address or domain name
	  port        : 5432,       // Postgres server port
	  username    : 'contacts',         // Username of database user
	  password    : 'contacts',         // Password of database user
	  
	})



	
	input = req.query.input.split(",")
	console.log("input: ")
	console.log(input)

	let ids = []
	let contacts = await contactSearch(input)

	console.log(contacts)

	res.json({ message: 'todo' });


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

		if (typeof inputs[i] === 'string') {
			console.log('string search')

			input = inputs[i].toLowerCase();
			//get contact ids for matching addresses
			let result = await sql`
				select distinct contact_id 
				from contact
				where
				fname = ${input} or
				mname = ${input} or
				lname = ${input} or
				
			`

			ids.push(...result)

			let result = await sql`
				select distinct contact_id 
				from address
				where
				city = ${input} or
				state = ${input} 
			`

			address = ${input} or
				city = ${input} or
				state = ${input} 
			console.log('search by string results ')
			console.log(results)

			console.log('got ids by string: ')
			console.log(ids)


		}

		if (typeof input[i] === 'number') {

			input = input.toLowerCase();
			//get contact ids for matching addresses
			let result = await sql`
				select distinct contact_id 
				address as a,
				phone as p
				where
				zip = ${input} or
				area_code = ${input} or
				number = ${input} or
			`

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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})