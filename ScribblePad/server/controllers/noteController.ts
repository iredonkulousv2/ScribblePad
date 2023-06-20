import {Request, Response, NextFunction} from 'express'
import Note from "../models/note"
import {Tag} from '../models/tag'

type noteController = {
    addNote: (req: Request, res: Response, next: NextFunction) => void
    deleteNote: (req: Request, res: Response, next: NextFunction) => void
    editNote: (req: Request, res: Response, next: NextFunction) => void
    getAllNotes: (req: Request, res: Response, next: NextFunction) => void
}   

type tag = {
    label: string,
    id: string
}

export const noteController: noteController = {
    addNote: async (req: Request, res: Response, next: NextFunction) => {
        console.log('inside addNote middleware')
        const {SSID} = req.cookies
        const {title,markdown,tags} = req.body

        const arrayofTags: any = []
        tags.forEach(async (t:tag) => {
            const {label,id} = t
            const newTag = new Tag({
                label,id
            })
            arrayofTags.push(newTag)


            const foundTag = await Tag.findOne({label,id})
            if(!foundTag){
                newTag.save()
            }
        }  )


        //console.log('arrayofTags',arrayofTags)
        const newNote = new Note({
            title,markdown,
            userId: SSID,
            tags: arrayofTags
        })
        await newNote.save()
        return next()
    },

    deleteNote: async (req: Request, res: Response, next: NextFunction) => {
        console.log('inside deleteNote MiddleWare')
        const {title} = req.body
        const {SSID: userId} = req.cookies

        // console.log('title',title)
        // console.log('userId',userId)
        await Note.findOneAndDelete({title,userId})
        return next()
    },

    editNote: async (req: Request, res: Response, next: NextFunction) => {
        console.log('inside editNote MiddleWare')
        //console.log('body',req.body)
        const {title,markdown} = req.body.data
        const {tags} = req.body
        const {SSID: userId} = req.cookies
        //console.log('data', req.body.data)
        await Note.findOneAndUpdate({title,userId},{markdown,tags})

        return next()
    },

    getAllNotes: async (req: Request, res: Response, next: NextFunction) => {
        console.log('inside getallNotes middleware')
        const {SSID: userId} = req.cookies
        const allNotes = await Note.find({userId})
        //console.log(allNotes)
        res.locals.allNotes = allNotes
        return next()
    }
}