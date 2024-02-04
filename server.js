const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const connect = require('./server/db/connect_db')
const taskRoutes = require('./server/routes/tasks')
const userRoutes = require('./server/routes/user')
const errorHandler = require("./server/middleware/error-handler")
app.prepare()
    .then(() => {
        const server = express()
        server.use(express.json())
        server.use('/api/tasks',taskRoutes);
        server.use('/api/account',userRoutes);
        server.use(errorHandler)
        server.all('*',(req,res) => {
            return handle(req,res)
        })
        const port = process.env.PORT || 3000;
        const start = async () => {
            try {
                await connect(process.env.MONGO_URL)
                server.listen(port,(err) => {
                    if(err) throw err
                    console.log(`Ready on http://localhost:${port}`)
                })
            } catch (error) {
                console.log(error)
            }
        }
        start()
        
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })


