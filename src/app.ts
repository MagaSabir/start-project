import exrpess, {Request, Response} from 'express';
import {SETTINGS} from "./settings";
import {db} from "./db/db";


export const app = exrpess();
app.use(exrpess.json())

const arr: any = ['P144','P240','P360','P480','P720','P1080','P1440','P2160']





app.get(SETTINGS.PATH.videos, (req: Request, res: Response) => {
    res.status(200).json(db)

})
app.get(SETTINGS.PATH.videos + '/:id', (req: Request, res: Response) => {
    const videoId = Number(req.params.id);
    let videos  = db.find(v => +v.id === videoId)
    if(videos) {
        res.send(videos)
    } else {
        res.send(404)
    }
})

app.post(SETTINGS.PATH.videos, (req: Request, res: Response) => {

    const errors = {
        "errorsMesage": [
            {
                "message": 'error',
                "field": 'availableResolutions'
            }
        ]
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

