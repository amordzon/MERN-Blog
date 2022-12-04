import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect(
    'mongodb+srv://' +
        process.env.LOGIN +
        ':' +
        process.env.PASSWORD +
        process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log('error in connection')
        } else {
            console.log('mongodb is connected')
        }
    }
)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Project',
    })
})
app.listen(process.env.PORT, () => {
    console.log(`Our server is running on port ${process.env.PORT}`)
})
