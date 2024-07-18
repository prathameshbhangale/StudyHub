import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/database.js"
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.js"
import bodyParser from 'body-parser'
import { cloudinaryConnect } from './config/cloudinary.js'
import profileRouter from "./routes/profile.js"
import courseRouter from "./routes/course.js"
import fileUpload from 'express-fileupload'

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

connectDB()
cloudinaryConnect()

app.use(bodyParser.json())
app.use(cookieParser())

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use('/user',userRouter)
app.use('/profile', profileRouter)
app.use('/course',courseRouter)

app.get('/', (req, res) => {
  res.send('study hub application.');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
