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

	
	input = req.query.input
	console.log("input: " + input)

	let ids = []
	let contacts = []
	if (typeof input === 'string') {
		input = input.toLowerCase();
		ids = await sql`
			select distinct contact_id 
			from address where
			city = ${input} or
			state = ${input}
		`		
		console.log('found ids:')

		console.log(ids)

	
		for (var i = 0; i < ids.length; i++) {
		    result = await sql`
				select * 
				from contact where
				contact_id = ${ids[i].contact_id}
			`
			contacts.push(result[0])


		}
		console.log('found contacts:')

	}

	console.log(contacts)

	res.json({ message: 'todo' });


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})