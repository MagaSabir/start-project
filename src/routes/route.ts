import {Request, Response, Router} from "express";
import {db, errors} from "../db/db";

export const videosRoutes = Router()
const arr: any = ['P144','P240','P360','P480','P720','P1080','P1440','P2160']


videosRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).json(db)

})
videosRoutes.get('/:id', (req: Request, res: Response) => {
    const videoId = Number(req.params.id);
    let videos  = db.find(v => +v.id === videoId)
    if(videos) {
        res.send(videos)
    } else {
        res.send(404)
    }
})


videosRoutes.post('/', (req: Request, res: Response) => {


    if(req.body.title.length > 40 || req.body.title.length < 1) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'errorsMessages'
        res.send(errors)
    }
    if(req.body.author.length > 20 || req.body.author.length < 1) {
        errors.errorsMessages[0].message = 'error'
        errors.errorsMessages[0].field = 'author'
        res.send(errors)
    }
    if(typeof req.body.canBeDownloaded !== "boolean" ) {
        errors.errorsMessages[0].message = 'title'
        errors.errorsMessages[0].field = 'canBeDownloaded'
        res.send(errors)
    }

    if (!req.body.availableResolutions.every((res: any) => arr.includes(res))) {

        res.status(400).send(errors);
    }
    else {
        const newVideo  = {
            id: Date.now(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions
        }

        db.push(newVideo)
        res.status(201).send(newVideo);

    }});
videosRoutes.delete('/:id', (req:Request, res:Response) => {
    for(let i = 0; i < db.length; i++) {
        if(db[i].id === +req.params.id) {
            db.splice(i, 1)
            res.sendStatus(204)
            return;
        }
    }

    res.sendStatus(404)
})

