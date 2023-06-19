import User from "../models/user";
import {Request, Response, NextFunction,} from 'express'
import bycrypt from "bcrypt"
import Session from "../models/session";

 const saltRounds = 10
 


type UserController  = {
    createUser: (req: Request, res: Response, next: NextFunction) => void
    findAllUser: (req: Request, res: Response, next: NextFunction) => void
    checkUserName: (req: Request, res: Response, next: NextFunction) => void
    logOut: (req: Request, res: Response, next: NextFunction) => void
    getUserName: (req: Request, res: Response, next: NextFunction) => void
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

        bycrypt.hash(password,saltRounds, async (err,hash) => {
        const newUser = new User({username,password: hash})
        await newUser.save()
        next()
        })
      
    },

    findAllUser: async (req:Request,res: Response, next: NextFunction) => {
        console.log('Inside findAllUser middleware')
        const {username, password} = req.body
        
        const found = await User.find({username})
        if(found.length > 0){
            bycrypt.compare(password, found[0].password, (error,response)=> {
                if(response){
                    const {_id} = found[0]
                    res.locals.id = _id
                    return next()
                } else {
                    return next({
                        err: 'username or password is wrong'
                    })
                }
               
            })
        }

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
    },

    logOut: async (req:Request, res: Response, next: NextFunction) => {
        console.log('inside logout middleware')
        const {SSID: id} = req.cookies
        
        console.log(id)
        await Session.findOneAndDelete({cookieId: id})
        return next()
    },

    getUserName: async (req:Request, res: Response, next: NextFunction) => {
        console.log('inside getUserName middleware')
        const {SSID: id} = req.cookies
        
        //console.log(id)
        const user: any = await User.findOne({_id: id})
        
        //console.log('user',user)
        res.locals.username = user.username
        
        return next()
    },




}
