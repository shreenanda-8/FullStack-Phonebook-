const express = require('express')

const app = express()
const cors = require('cors')

app.use(cors())
var morgan = require('morgan')

app.use(express.json())
morgan.token('post',  (req)=>{
	if(req.method === 'POST')
    {
        return JSON.stringify(req.body)
    }
	else
    {

		return null
    }
})

morgan.format('data',':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('data'))
const getRandom = () => {
    return Math.floor((Math.random() * 100000000000) + 121);
}
const data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get('/api/persons', (request, response) => {
    response.send(JSON.stringify(data))
})
app.get('/info', (request, response) => {

    response.send(
        `<div>
       <p>Phonebook has info for ${data.length} people</p>
       ${new Date()}
       </div>
       
       `
    )
})
app.get('/api/persons/:id', (request, response) => {

    const ID = Number(request.params.id)
    const info = data.filter((info) => info.id === ID)
    console.log(info)
    if (info.length) {

        response.json(info)
    }
    else {
        response.status(404).send("Reqeusting user not found")
    }

})
app.delete('/api/persons/:id', (request, response) => {
    console.log("Deleted")
    const list = data.filter((info) => {
        return info.id !== Number(request.params.id)
    })
    data = list
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const info = {
        name: `${request.body.name}`,
        number: `${request.body.number}`,
        id: getRandom()
    }
    if (info.name.length && info.number.length) {
        const value = data.filter((item) => {
            
            return item.name == info.name
        })
       
       
        if (value.length) {
            response.status(406).json({ error: "Name must be unique" })

        }
        else {
            data.push(info)
           
            response.status(202).json(data)
        }
    }
    else {
        response.status(406).json({ error: "Inormation is not sufficient" })
    }

})
const PORT = process.env.PORT || 3001
app.listen(PORT, (request, response) => {
    console.log("Server started running")
})