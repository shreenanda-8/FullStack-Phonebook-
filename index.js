const express = require('express')
const Phone = require('./models/phone.js')
const app = express()
const cors = require('cors')

app.use(cors())
var morgan = require('morgan')

app.use(express.json())
app.use(express.static('build'))
morgan.token('post', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    else {

        return null
    }
})

morgan.format('data', ':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('data'))

app.get('/api/persons', (request, response, next) => {
    Phone.find({})
        .then((res) => {
            response.json(res)
        })
        .catch((err) => {
            next(err)
        })

})
app.get('/info', (request, response) => {

    Phone.find({})
        .then((data) => {
            console.log(data)
            response.send(
                `<div>
           <p>Phonebook has info for ${data.length} people</p>
           ${new Date()}
           </div>
           
           `
            )
        })


})
app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Phone.findById(id)
        .then((res) => {
            if (res) {
                response.status(200).json(res)
            }
            else {
                response.status(404).end()
            }

        })
        .catch((err) => {
            next(err)
        })


})
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Phone.findByIdAndDelete(id)
        .then((res) => {
            console.log(res)
            response.status(204).end()
        })
        .catch((err) => {
            next(err)
        })

})
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const info = new Phone({
        name: `${body.name}`,
        number: `${body.number}`,
        date: new Date
    })

    if (info.name.length && info.number.length) {
       
                    info.save()
                        .then((res) => {
                           return res.toJSON()
                        })
                        .then((res)=>{
                            response.json(res)
                        })
                        .catch((err) => {
                            next(err)
                        })

    }
    else {
        return response.status(406).json({ error: "Inormation is not sufficient" })
    }

})
app.put('/api/persons/:id', (request, response, next)=>{
    const ID = request.params.id
    const data = {
        name:request.body.name,
        number: request.body.number
    }

    Phone.findByIdAndUpdate(ID,data,{new: true})
         .then((res)=>{
             
             response.json(res)
         })
         .catch((err)=>next(err))

})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint" })
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, (request, response) => {
    console.log("Server started running")
})