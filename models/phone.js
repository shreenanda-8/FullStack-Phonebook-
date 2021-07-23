const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected')
  })
  .catch((err) => {
    console.log({ error: err.message })
  })

const phoneSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  },
  date: Date
})
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
phoneSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Phone',phoneSchema )