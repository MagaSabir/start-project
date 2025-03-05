import {Request, Response, Router} from "express";
import {db, errors, arr} from "../db/db";
import any = jasmine.any;

export const videosRoutes = Router()


videosRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).json(db.videos)
})

videosRoutes.get('/:id', (req: Request, res: Response) => {
    const videoId = parseInt(req.params.id);
    let videos  = db.videos.find(v => v.id === videoId)
    if(videos) {
        res.status(200).json(videos)
    } else {
        res.sendStatus(404)
    }
})

videosRoutes.post('/', (req: Request, res: Response) => {

    if(req.body.title.length > 40 || req.body.title.length < 1 || typeof req.body.title !== "string") {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'title'
        res.send(errors)
    }
    if(req.body.author.length > 20 || req.body.author.length < 1 || typeof req.body.title !== "string") {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'author'
        res.send(errors)
    }
    if(req.body.minAgeRestriction < 1) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'minAgeRestriction'
        res.send(errors)
    }
    if(req.body.minAgeRestriction > 19) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'minAgeRestriction'
        res.send(errors)
    }
    if(typeof req.body.canBeDownloaded !== "boolean" ) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'canBeDownloaded'
        res.send(errors)
    }
    if(!Array.isArray(req.body.availableResolutions)){
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'availableResolutions'
        res.send(errors)
    }

    if (!req.body.availableResolutions.every((res: any) => arr.includes(res)) || !req.body.availableResolutions.length) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'availableResolutions'
        res.status(400).send(errors);
    }
    else {
        const newVideo  = {
            id: db.videos ? db.videos[db.videos.length - 1].id + 1: 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions
        }
        db.videos.push(newVideo)
        res.status(201).send(newVideo);
    }});

videosRoutes.put('/:id', ( req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
    const videoIndex = db.videos.findIndex(v => v.id === id)
    const video = db.videos[videoIndex]
    if(video.title.length > 41) {
            errors.errorsMessages[0].message = 'error'
            errors.errorsMessages[0].field = 'title'
            res.send(errors)
    }
    if(video.author.length > 21) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'author'
        res.send(errors)
    }

    if (!req.body.availableResolutions.every((res: any) => arr.includes(res)) || !req.body.availableResolutions.length) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'availableResolutions'
        res.send(errors);
    }
    if(typeof req.body.canBeDownloaded !== "boolean" ) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'canBeDownloaded'
        res.send(errors)
    }

    if(req.body.minAgeRestriction < 1) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'minAgeRestriction'
        res.send(errors)
    }
    if(req.body.minAgeRestriction > 19) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'minAgeRestriction'
        res.send(errors)
    }

    if(videoIndex === -1) {
        res.sendStatus(404)
    }
    else {
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate
    }
    res.send(video)
})

videosRoutes.delete('/:id', (req:Request, res:Response) => {
    for(let i = 0; i < db.videos.length; i++) {
        if(db.videos[i].id === +req.params.id) {
            db.videos.splice(i, 1)
            res.sendStatus(204)
        }
    }

    res.sendStatus(404)
})

videosRoutes.delete('/', (req:Request, res:Response) => {
    db.videos = [] as any

    res.sendStatus(204)
})
