import {Request, Response, NextFunction} from 'express'

type cookieController = {
    createCookie: (req: Request, res: Response, next: NextFunction) => void
}

export const cookieController: cookieController = {
    createCookie: async (req: Request, res: Response, next: NextFunction) => {
        console.log('inside createcookie middleware')
        res.cookie('SSID', res.locals.id, {httpOnly:true})
        return next()
    }
}