const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()
const url = 'mongodb+srv://nanda:simple@cluster0.s3vdf.mongodb.net/peoples?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then((res)=>{
    console.log("Connected")
})
.catch((err)=>{
    console.log({error: err.message})
})

const phoneSchema = mongoose.Schema({
   name: String,
   number: String,
   date: Date
})
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone',phoneSchema )