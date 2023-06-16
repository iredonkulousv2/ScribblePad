import express, { Request, Response} from 'express'
import mongoose from 'mongoose'

import User from './models/user'

const app = express();
const PORT = 8000

app.use(express.json())

app.post('/login', async (req: Request, res: Response) => {
  
  const newUser = new User({
    _id: 1,
    name: 'Jack',
    password: 'Jack'
  })
  const createdUser = await newUser.save()
  res.json(createdUser)

})

app.get('/', (req: Request,res: Response) => {
  res.json('Hello World')
  
})

//const db = mongoose.connect('mongodb+srv://philip14633:philip14633@cluster0.xeien5n.mongodb.net/?retryWrites=true&w=majority')

mongoose.connect('mongodb+srv://philip14633:philip14633@cluster0.xeien5n.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
  console.log('connected to Database')
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  })
})

