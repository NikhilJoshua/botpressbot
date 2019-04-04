console.log("HI")

const knex = require('./conn.js')
var flag = false
var ocar = false
var exec = false
const reply = async () => {
	const eventDestination = {
		channel: event.channel,
		target: event.target,
		botId: event.botId,
		threadId: event.threadId
	}
	await event.nlu.entities.forEach(async function(x){
		if(x.name === "Cars"){
			flag = true
			exec = true
			await knex('cars').where({Name: x.data.value}).then(async function(r){
				const payloads = await bp.cms.renderElement('builtin_text', {text:  "Price of " + x.data.value + " is " + r[0].price + " Lakhs", typing: false}, eventDestination)
				await bp.events.replyToEvent(event, payloads)
		})
		}
		else if(x.name == "oCars"){
			ocar = true
			exec = true
			const payloads = await bp.cms.renderElement('builtin_text', {text: "Sorry we only sell Hyundai cars. Please enquire about Hyundai cars only.", typing: true}, eventDestination)
			await bp.events.replyToEvent(event, payloads)
		}
	})
	if(!exec){
		const payloads = await bp.cms.renderElement('builtin_text', {text: "Sorry we only sell Hyundai cars. Please enquire about Hyundai cars only.", typing: true}, eventDestination)
		await bp.events.replyToEvent(event, payloads)
	}
/*
	if(!flag && user.car !== undefined && !ocar){
		await knex('cars').where({Name: user.car }).then(async function(r){
				const payloads = await bp.cms.renderElement('builtin_text', {text: "Price of " + user.car + " is " + r[0].price + " Lakhs", typing: false}, eventDestination)
				await bp.events.replyToEvent(event, payloads)
	}
}*/
}
		


return reply()
