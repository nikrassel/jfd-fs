const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require ('cors')
const path = require('path')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)

const PORT = config.get('port') ?? 8080
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))
    const indexPath = path.join(__dirname, 'client', "index.html")
    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    })
}
// if (process.env.NODE_ENV === 'production') {
//     console.log('Production')
// } else {
//     console.log('Development')
// }

async function start() {
    try {
        // await mongoose.connect(config.get('mongoUri'))
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(
            `mongodb://${config.HOST}:${config.PORT}/${config.DB}`
        );
        app.listen(PORT, () => 
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        )
    } catch (error) {
        console.log(chalk.red(error.message))
        process.exit(1)
    }
}
start()

