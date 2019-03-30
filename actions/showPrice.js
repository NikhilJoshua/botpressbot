const knex = require('./conn.js')
/*
event.nlu.entities.forEach(function(x){
	if(x.data.value !== undefined){
		console.log("HUUUU")
	}else{
		console.log("HAA")
	}
})

*/


const reply = async () => {
	const eventDestination = {
		channel: event.channel,
		target: event.target,
		botId: event.botId,
		threadId: event.threadId
	}

var flag = false

	await event.nlu.entities.forEach(async function(x){
		if(x.name === "Cars"){
			flag = true
			//user['car'] = (user['car'] === undefined) ? x.data.value : user['car']
			user['car'] = x.data.value
			await knex('cars').where({Name: x.data.value}).then(async function(r){
				const payloads = await bp.cms.renderElement('builtin_text', {text: "Price of " + x.data.value + " is " + r[0].price, typing: false}, eventDestination)
				await bp.events.replyToEvent(event, payloads)
		})
	}

	})

	if(!flag && user.car !== undefined){
		await knex('cars').where({Name: user.car }).then(async function(r){
				const payloads = await bp.cms.renderElement('builtin_text', {text: "Price of " + user.car + " is " + r[0].price, typing: false}, eventDestination)
				await bp.events.replyToEvent(event, payloads)
	})
}
}

return reply()
/*
	if(event.nlu["entities"][0]["name"] === "Cars"){
		user['car'] = event.nlu["entities"][0]["data"]["value"]
		await knex('cars').where({Name: event.nlu["entities"][0]["data"]["value"]}).then(async function(r){
			const payloads = await bp.cms.renderElement('builtin_text', {text:"Price of " + user['car'] +" is " + r[0].price , typing:false}, eventDestination)
			await bp.events.replyToEvent(event, payloads)
		})
	}
	else if(event.nlu["entities"][1]["name"] === "Cars"){
		user['car'] = event.nlu["entities"][1]["data"]["value"]
		await knex('cars').where({Name: event.nlu["entities"][1]["data"]["value"]}).then(async function(r){
			const payloads = await bp.cms.renderElement('builtin_text', {text:"Price of " + user['car'] +" is " + r[0].price , typing:false}, eventDestination)
			await bp.events.replyToEvent(event, payloads)
		})
	}

}

return reply()
*/
//event.nlu.intent.name === 'range' && "name" in event.nlu.entities[0]