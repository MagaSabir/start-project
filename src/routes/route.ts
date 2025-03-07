import {Request, Response, Router} from "express";
import {db, arr} from "../db/db";

export const videosRoutes = Router()


videosRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).send(db.videos)
})

videosRoutes.get('/:id', (req: Request, res: Response) => {
    const videoId = parseInt(req.params.id);
    let video  = db.videos.find(v => v.id === videoId)
    if(video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
    }

})

videosRoutes.post('/', (req: Request, res: Response) => {
     const errors: any = {
        errorsMessages: []
    }
    if(!req.body.title || typeof req.body.title !== "string" || req.body.title.trim().length > 40 || req.body.title.trim().length < 1) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'title'
        })
        return;
    }


    if(!req.body.author || typeof req.body.author !== "string" || req.body.author.trim().length > 20 || req.body.author.trim().length < 1 ) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'author'
        })
    }

    if(!req.body.publicationDate || typeof req.body.publicationDate !== "string") {
        errors.errorsMessages.push({
            message: 'error',
            field: 'publicationDate'
        })}

    if(!Array.isArray(req.body.availableResolutions)){
        errors.errorsMessages.push({
            message: 'error',
            field: 'availableResolutions'
        })
    }

    if (!req.body.availableResolutions.every((res: any) => arr.includes(res)) || !req.body.availableResolutions.length) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'availableResolutions'
        })

    }

    if(errors.errorsMessages.length){
        console.log('Validation errors:', errors);
        res.status(400).send(errors)
        return
    }
const date = new Date()
        const newVideo: any  = {
            id: Math.floor(Date.now() + Math.random()),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(),
            availableResolutions: req.body.availableResolutions
        }

        db.videos.push(newVideo)
        res.status(201).send(newVideo);
    });

videosRoutes.put('/:id', ( req:Request,res:Response)=> {
     const errors: any = {
        errorsMessages: []
    }
    const id = parseInt(req.params.id);
    const videoIndex = db.videos.findIndex(v => v.id === id)

    if(videoIndex === -1) {
        res.sendStatus(404)

    }

    const video = db.videos[videoIndex]
    if(!req.body.title || typeof req.body.title !== "string" || req.body.title.trim().length > 40 || req.body.title.trim().length < 1) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'title'
        })

    }

    if(!req.body.author || typeof req.body.author !== "string" || req.body.author.trim().length > 20 || req.body.author.trim().length < 1) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'author'
        })

    }

    if (!req.body.availableResolutions.every((res: any) => arr.includes(res)) || !req.body.availableResolutions.length) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'availableResolutions'
        })

    }

    if(typeof req.body.canBeDownloaded !== "boolean" ) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'canBeDownloaded'
        })

    }

    if(!req.body.minAgeRestriction || req.body.minAgeRestriction > 19 ) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'minAgeRestriction'
        })

    }

    if(errors.errorsMessages.length){
        console.log('Validation errors:', errors);
        res.status(400).send(errors)
        return
    }


    else {
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate
    }
    res.sendStatus(204)
    return

})

videosRoutes.delete('/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const videoIndex = db.videos.findIndex(v => v.id === id)

    if(videoIndex === -1) {
        res.sendStatus(404)
        return
    }

    db.videos.splice(videoIndex, 1)
    res.sendStatus(204)

})

videosRoutes.delete('/', (req:Request, res:Response) => {
    db.videos = [] as any
    res.sendStatus(204)
    return
})
