
var knex = require('./conn.js')
var dts=""
//var user = { car: "verna"}

const reply = async () => {
	const eventDestination = {
		channel: event.channel,
		target: event.target,
		botId: event.botId,
		threadId: event.threadId
	}
await knex('cars').where({Name: user['car']}).select('name','price','Seats').then(async function(r){
		for( x in r[0]){
			console.log()
			const payloads = await bp.cms.renderElement('builtin_text', {text:x+" : " + r[0][x], typing:false}, eventDestination)
			await bp.events.replyToEvent(event, payloads)
		}
		
})

}

return reply()