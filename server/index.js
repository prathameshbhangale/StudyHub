import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/database.js"
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.js"
import bodyParser from 'body-parser'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB()
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)

app.get('/', (req, res) => {
  res.send('syudy hub application.');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
