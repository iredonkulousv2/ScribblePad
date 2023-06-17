import {Request, Response, NextFunction, ErrorRequestHandler} from 'express'
import Session from "../models/session"

type sessionController = {
    createSession: (req: Request, res: Response, next: NextFunction) => void
    isSessionValid: (req: Request, res: Response, next: NextFunction) => void
}

export const sessionController = {
    createSession: async (req:Request, res:Response, next: NextFunction) => {
    console.log('inside createSession middleware')
       await Session.create({
            cookieId: res.locals.id
        })
        return next()
    },

    isSessionValid: async (req: Request, res: Response, next: NextFunction) => {
        console.log('inside isSessionValid middleware')
        const validSession = await Session.find({
            cookieId: res.locals.id
        })
        if(!validSession.length){
            return next({
                err: 'invalid session'
            })
        }

        return next()

    }


}

