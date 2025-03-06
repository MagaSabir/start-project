"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.videosRoutes = (0, express_1.Router)();
exports.videosRoutes.get('/', (req, res) => {
    res.status(200).json(db_1.db.videos);
});
exports.videosRoutes.get('/:id', (req, res) => {
    const videoId = parseInt(req.params.id);
    let video = db_1.db.videos.find(v => v.id === videoId);
    if (video) {
        res.status(200).json(video);
    }
    else {
        res.sendStatus(404);
    }
});
exports.videosRoutes.post('/', (req, res) => {
    const errors = {
        errorsMessages: []
    };
    if (!req.body.title || typeof req.body.title !== "string" || req.body.title.trim().length > 40 || req.body.title.trim().length < 1) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'title'
        });
        // errors.errorsMessages[0].message = 'error'
        // errors.errorsMessages[0].field = 'title'
        // res.send(errors)
    }
    if (!req.body.author || typeof req.body.author !== "string" || req.body.author.trim().length > 20 || req.body.author.trim().length < 1) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'author'
        });
    }
    // if(req.body.minAgeRestriction < 1) {
    //     errors.errorsMessages[0].message = 'error'
    //     errors.errorsMessages[0].field = 'minAgeRestriction'
    //     res.send(errors)
    // }
    // if(req.body.minAgeRestriction > 19) {
    //     errors.errorsMessages[0].message = 'error'
    //     errors.errorsMessages[0].field = 'minAgeRestriction'
    //     res.send(errors)
    // }
    // if(typeof req.body.canBeDownloaded !== "boolean" ) {
    //     errors.errorsMessages[0].message = 'error'
    //     errors.errorsMessages[0].field = 'canBeDownloaded'
    //     res.send(errors)
    // }
    if (!Array.isArray(req.body.availableResolutions)) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'availableResolutions'
        });
        // res.send(errors)
    }
    if (!req.body.availableResolutions.every((res) => db_1.arr.includes(res)) || !req.body.availableResolutions.length) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'availableResolutions'
        });
        //res.status(400).send(errors);
    }
    if (errors.errorsMessages.length) {
        console.log('Validation errors:', errors);
        res.status(400).send(errors);
        return;
    }
    const newVideo = {
        id: db_1.db.videos ? db_1.db.videos[db_1.db.videos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    db_1.db.videos.push(newVideo);
    res.status(201).send(newVideo);
    console.log(req.body.title);
});
exports.videosRoutes.put('/:id', (req, res) => {
    const errors = {
        errorsMessages: []
    };
    const id = parseInt(req.params.id);
    const videoIndex = db_1.db.videos.findIndex(v => v.id === id);
    if (videoIndex === -1) {
        res.sendStatus(404);
        return;
    }
    const video = db_1.db.videos[videoIndex];
    if (req.body.title.length > 41) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'title'
        });
    }
    if (video.author.length > 21) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'author'
        });
    }
    if (!req.body.availableResolutions.every((res) => db_1.arr.includes(res)) || !req.body.availableResolutions.length) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'availableResolutions'
        });
    }
    if (typeof req.body.canBeDownloaded !== "boolean") {
        errors.errorsMessages.push({
            message: 'error',
            field: 'canBeDownloaded'
        });
    }
    // if(req.body.minAgeRestriction < 1) {
    //     errors.errorsMessages[0].message = 'error'
    //     errors.errorsMessages[0].field = 'minAgeRestriction'
    //     res.send(errors)
    // }
    // if(req.body.minAgeRestriction > 19) {
    //     errors.errorsMessages[0].message = 'error'
    //     errors.errorsMessages[0].field = 'minAgeRestriction'
    //     res.send(errors)
    // }
    if (videoIndex === -1) {
        res.sendStatus(404);
    }
    else {
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate;
    }
    res.sendStatus(204);
});
exports.videosRoutes.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const videoIndex = db_1.db.videos.findIndex(v => v.id === id);
    if (videoIndex === -1) {
        res.sendStatus(404);
        return;
    }
    db_1.db.videos.splice(videoIndex, 1);
    res.sendStatus(204);
});
exports.videosRoutes.delete('/', (req, res) => {
    db_1.db.videos = [];
    res.sendStatus(204);
});
