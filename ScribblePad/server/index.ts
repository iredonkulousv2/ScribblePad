import express, { Request, Response, ErrorRequestHandler, NextFunction} from 'express'
import mongoose from 'mongoose'
import {config} from 'dotenv'
import { userController } from './controllers/userController'
import { cookieController } from './controllers/cookieController'
import { sessionController } from './controllers/sessionController'
import { noteController } from './controllers/noteController'
import cookieParser from "cookie-parser"
import cors from "cors"

config()

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))

app.post('/signup', userController.checkUserName, userController.createUser, (req:Request, res: Response,) => {
  res.json('Created User')
})

app.post('/login', userController.findAllUser, cookieController.createCookie, sessionController.createSession, 
(req: Request, res: Response) => {
  res.json({
    login: true,
    id: res.locals.id})

})

app.get('/validSession', sessionController.isSessionValid, userController.getUserName, (req: Request, res: Response) => {
  res.json(res.locals)
})

app.get('/logout', userController.logOut, (req: Request, res: Response) => {
  res.json('Logged Out')
})

app.post('/addNote', noteController.addNote,(req: Request,res: Response) => {
  res.json('Adding Note')
})

app.post('/deleteNote', noteController.deleteNote,(req: Request,res: Response) => {
  res.json('Deleting Note')
})

app.post('/editNote', noteController.editNote,(req: Request,res: Response) => {
  res.json('Editing Note')
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

