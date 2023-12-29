require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))


let persons = [
  {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 1
    },
    {
      name: "sadasdas",
      number: "11841814",
      id: 4
    },
    {
      name: "ashwag",
      number: "8888888888888888888888888",
      id: 6
    },
    {
      name: "erick",
      number: "78965",
      id: 8
    },
    {
      name: "monica",
      number: "333333333",
      id: 13
    },
    {
      name: "marshall",
      number: "111111111",
      id: 15
    },
    {
      name: "camel",
      number: "45",
      id: 16
    },
    {
      name: "sadagv",
      number: "51615665",
      id: 19
    },
    {
      name: "sdadaf",
      number: "78",
      id: 21
    },
    {
      name: "haj",
      number: "456523",
      id: 22
    }
]



app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons =>{
    res.json(persons)
  })
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
   
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
})

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
