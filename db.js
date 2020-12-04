function dbConnect() {
const mongoose = require('mongoose')
const url = process.env.MONGOURI

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

const connection = mongoose.connection
connection.once('open', function() {
    console.log('Connected to mongo DB')
}).catch(err => console.log(`Error: ${err}`))
}

module.exports = dbConnect