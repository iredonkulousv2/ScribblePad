import User from "../models/user";
import {Request, Response, NextFunction, ErrorRequestHandler} from 'express'

type UserController  = {
    createUser: (req: Request, res: Response, next: NextFunction) => void
    findAllUser: (req: Request, res: Response, next: NextFunction) => void
    checkUserName: (req: Request, res: Response, next: NextFunction) => void
}


export const userController: UserController = {
    createUser: async (req: Request,res: Response,next: NextFunction) => {
        console.log('Inside createuser middleware')
        const {username, password} = req.body
        if(!username || !password){
            return next({
                err:'username or password is missing'
            })
        }
        
        const newUser = new User({username,password})
        const createdUser = await newUser.save()
        //console.log('createdUser',createdUser)
        next()
    },

    findAllUser: async (req:Request,res: Response, next: NextFunction) => {
        console.log('Inside findAllUser middleware')
        const {username, password} = req.body
        const found = await User.find({username,password})
        if(!found.length){
            return next({
                err: 'username or password is wrong'
            })
        }
        const {_id} = found[0]
        res.locals.id = _id
        return next()

    },

    checkUserName: async (req:Request,res: Response, next: NextFunction) => {
        console.log('Inside checkUserName middleware')
        const {username} = req.body
        const found = await User.find({username})
 
        if(found.length){
            return next({
                err:'username is taken'
            })
        }

        return next()
    }



}
