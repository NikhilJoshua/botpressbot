
var knex = require('./conn.js')
var cars = "hi"
//var reply = "The following vehicles are available:"
var cars = {
		text: "Please select the car you want to enquire about.",
      	choices: [],
      	typing: true 
      }



const reply = async () => {
	const eventDestination = {
		channel: event.channel,
		target: event.target,
		botId: event.botId,
		threadId: event.threadId
	}
	await knex.select('*').from('cars').then(function (rows) {
	//console.log(rows);
	rows.forEach(function(e){
		cars.choices.push({title:e.name, value:e.name})
	})
	})
	const payloads = await bp.cms.renderElement('builtin_single-choice', cars, eventDestination)
	await bp.events.replyToEvent(event, payloads)
}

return reply()

/*

const axios = require('axios')

const getQuote = async () =>	 {
  // We declare a new axios instance
  const client = axios.create({
    baseURL: 'https://opinionated-quotes-api.gigalixirapp.com/v1'
  })

  // And we get a new quote
  const quote = event.nlu.intent.name // await client.get('/quotes').then(res => res.data.quotes[0].quote)
	  const eventDestination = {
	  channel: event.channel,
	  target: event.target,
	  botId: event.botId,
	  threadId: event.threadId
	}
	console.log("quote")
	const payloads = await bp.cms.renderElement('builtin_single-choice', {text: "choice",
      choices: [
        {
          title: "1",
          value: "1"
        },
        {
          title: "2",
          value: "2"
        }
      ] }, eventDestination)

	await bp.events.replyToEvent(event, payloads)
}

// Actions are async, so make sure to return a Promise
return getQuote()

*/
