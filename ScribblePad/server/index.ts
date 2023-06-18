import express, { Request, Response, ErrorRequestHandler, NextFunction} from 'express'
import mongoose from 'mongoose'
import {config} from 'dotenv'
import { userController } from './controllers/userController'
import { cookieController } from './controllers/cookieController'
import { sessionController } from './controllers/sessionController'
import cookieParser from "cookie-parser"



config()

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.post('/signup', userController.checkUserName, userController.createUser, (req:Request, res: Response,) => {
  res.json('Created User')
})

app.post('/login', userController.findAllUser, cookieController.createCookie, sessionController.createSession, sessionController.isSessionValid, 
(req: Request, res: Response) => {
  res.json('successful login')

})

app.get('/', (req: Request,res: Response) => {
  res.json('Hello World')
})

//const db = mongoose.connect('mongodb+srv://philip14633:philip14633@cluster0.xeien5n.mongodb.net/?retryWrites=true&w=majority')

app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

app.use((err:ErrorRequestHandler, req : Request, res: Response, next: NextFunction) => {
  res.json(err)
});



mongoose.connect(process.env.MONGO_URL!)
.then(() => {
  console.log('connected to Database')
  
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
   
  })
})

