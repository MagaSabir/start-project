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
    let videos = db_1.db.videos.find(v => v.id === videoId);
    if (videos) {
        res.status(200).json(videos);
    }
    else {
        res.sendStatus(404);
    }
});
exports.videosRoutes.post('/', (req, res) => {
    if (req.body.title.length > 40 || req.body.title.length < 1 || typeof req.body.title !== "string") {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'title';
        res.send(db_1.errors);
    }
    if (req.body.author.length > 20 || req.body.author.length < 1 || typeof req.body.title !== "string") {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'author';
        res.send(db_1.errors);
    }
    if (req.body.minAgeRestriction < 1) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'minAgeRestriction';
        res.send(db_1.errors);
    }
    if (req.body.minAgeRestriction > 19) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'minAgeRestriction';
        res.send(db_1.errors);
    }
    if (typeof req.body.canBeDownloaded !== "boolean") {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'canBeDownloaded';
        res.send(db_1.errors);
    }
    if (!Array.isArray(req.body.availableResolutions)) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'availableResolutions';
        res.send(db_1.errors);
    }
    if (!req.body.availableResolutions.every((res) => db_1.arr.includes(res)) || !req.body.availableResolutions.length) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'availableResolutions';
        res.status(400).send(db_1.errors);
    }
    else {
        const newVideo = {
            id: db_1.db.videos ? db_1.db.videos[db_1.db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        db_1.db.videos.push(newVideo);
        res.status(201).send(newVideo);
    }
});
exports.videosRoutes.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const videoIndex = db_1.db.videos.findIndex(v => v.id === id);
    const video = db_1.db.videos[videoIndex];
    if (video.title.length > 41) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'title';
        res.send(db_1.errors);
    }
    if (video.author.length > 21) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'author';
        res.send(db_1.errors);
    }
    if (!req.body.availableResolutions.every((res) => db_1.arr.includes(res)) || !req.body.availableResolutions.length) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'availableResolutions';
        res.send(db_1.errors);
    }
    if (typeof req.body.canBeDownloaded !== "boolean") {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'canBeDownloaded';
        res.send(db_1.errors);
    }
    if (req.body.minAgeRestriction < 1) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'minAgeRestriction';
        res.send(db_1.errors);
    }
    if (req.body.minAgeRestriction > 19) {
        db_1.errors.errorsMessages[0].message = 'error';
        db_1.errors.errorsMessages[0].field = 'minAgeRestriction';
        res.send(db_1.errors);
    }
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
    res.send(video);
});
exports.videosRoutes.delete('/:id', (req, res) => {
    for (let i = 0; i < db_1.db.videos.length; i++) {
        if (db_1.db.videos[i].id === +req.params.id) {
            db_1.db.videos.splice(i, 1);
            res.sendStatus(204);
        }
    }
    res.sendStatus(404);
});
exports.videosRoutes.delete('/', (req, res) => {
    db_1.db.videos = [];
    res.sendStatus(204);
});
