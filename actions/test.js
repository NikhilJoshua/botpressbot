/*var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'automobile'
	}
});
knex.select('*').from('cars').then(function (rows) {
	//console.log(rows);
	rows.forEach(function(e){
		console.log(e.Name);
	});
});

*/

var test = {
	text: "title",
	choice: [
	{
		title:"ti",
		value:"vi"
	},
	{
		title:"ti2",
		value:"vi2"
	}
	]
}

test.choice.push({title:"ti3", value:"vi3"})

console.log(test)

