import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/database.js"
import maileFunctionalityAdd from "./config/Nodemailer.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

async function startServer() {
  try {
    await connectDB()
    await maileFunctionalityAdd()

    app.get('/', (req, res) => {
      res.send('Hello, world! This is your Express.js application.')
    })

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error('Error starting the server:', error)
    process.exit(1)
  }
}

startServer()
