const knex = require('./conn.js')

const reply = async () => {
	const eventDestination = {
		channel: event.channel,
		target: event.target,
		botId: event.botId,
		threadId: event.threadId
	}

function formSentence(attr, name, value){
	switch (attr){
		case 'seats':
			return value + " seats are available in " + name
			break
		case 'gears':
			return "There are " + value + " gears in " + name
			break
		case 'fuelType':
			var ft = value.split('/')
			return name + " is available in " + ft[0] + ((ft[1]!==undefined) ? " and " + ft[1] : "")
			break
		case 'transmission':
			var tr = value.split('/')
			return name + " has " + tr[0] + ((tr[1]!==undefined ) ? " and " + tr[1] : "") + " transmission."
			break
		case 'engineCC':
			return name + " has " + value + " engine "
			break
		case 'mileage':
			return name + " gives " + value + " mileage"
			break
		case 'paymentType':
			var pt = value.split('/')
			var pts = ""
			pt.forEach(function(x){
				pts += x+", "
			})
			return "You can pay using " + pts.slice(0,-2)
		case 'colours':
			var cl = value.split('/')
			var cols = ""
			cl.forEach(function	(x){
					cols += x+", "
			})
			return name + " is available in " + cols.slice(0, -2)
			break
		case 'dieselPrice':
			return "Diesel price for " + name + " is ₹" + value + " Lakhs"
			break
		case 'petrolPrice':
			return "Petrol price for " + name +	 " is ₹" + value + " Lakhs"
			break
		case 'none':
			return "Sorry the information you provided is inappropriate"
			break

		default:
			if(value !== undefined)
				return attr.replace(/([A-Z])/g, " $1").toLowerCase() + " of " + name + " is " + value
			else
				return "I didn't understand that, please be more specific."
			break
	}
}

var attr = event.nlu.intent.name
var flag = false

	await event.nlu.entities.forEach(async function(x){
		if(x.name === "Cars"){
			flag = true
			//user['car'] = (user['car'] === undefined) ? x.data.value : user['car']
			user['car'] = x.data.value
			await knex('cars').where({Name: x.data.value}).then(async function(r){
				const payloads = await bp.cms.renderElement('builtin_text', {text: formSentence(attr, x.data.value,r[0][attr])/*attr.replace(/([A-Z])/g, " $1").toLowerCase() + " of " + x.data.value + " is " + r[0][attr]*/, typing: false}, eventDestination)
				await bp.events.replyToEvent(event, payloads)
		})
	}
	else if(x.name === "oCars"){
		flag = true
		const payloads = await bp.cms.renderElement('builtin_text', {text: "Sorry we only sell Hyundai cars. Please enquire about Hyundai cars only.", typing: true}, eventDestination)
		await bp.events.replyToEvent(event, payloads)
	}

	})

	if(!flag && user.car !== undefined){
		await knex('cars').where({Name: user.car }).then(async function(r){
				const payloads = await bp.cms.renderElement('builtin_text', {text: formSentence(attr, user.car, r[0][attr])/*attr.replace(/([A-Z])/g, " $1").toLowerCase() + " of " + user.car + " is " + r[0][attr]*/, typing: false}, eventDestination)
				await bp.events.replyToEvent(event, payloads)
	})
}
}

return reply()