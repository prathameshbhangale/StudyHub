import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/database.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

connectDB()  // connect to DB

app.get('/', (req, res) => {
  res.send('Hello, world! This is your Express.js application.')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})