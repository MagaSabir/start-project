"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.videosRoutes = (0, express_1.Router)();
const arr = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
exports.videosRoutes.get('/', (req, res) => {
    res.status(200).json(db_1.db);
});
exports.videosRoutes.get('/:id', (req, res) => {
    const videoId = Number(req.params.id);
    let videos = db_1.db.find(v => +v.id === videoId);
    if (videos) {
        res.send(videos);
    }
    else {
        res.send(404);
    }
});
const errors = {
    errorsMessages: [
        {
            message: "string",
            field: "string"
        }
    ]
};
exports.videosRoutes.post('/', (req, res) => {
    if (req.body.title.length > 40 || req.body.title.length < 1) {
        errors.errorsMessages[0].message = 'error';
        errors.errorsMessages[0].field = 'errorsMessages';
        res.send(errors);
    }
    if (req.body.author.length > 20 || req.body.author.length < 1) {
        errors.errorsMessages[0].message = 'error';
        errors.errorsMessages[0].field = 'author';
        res.send(errors);
    }
    if (typeof req.body.canBeDownloaded !== "boolean") {
        errors.errorsMessages[0].message = 'title';
        errors.errorsMessages[0].field = 'canBeDownloaded';
        res.send(errors);
    }
    if (!req.body.availableResolutions.every((res) => arr.includes(res))) {
        res.status(400).send(errors);
    }
    else {
        const newVideo = {
            id: Date.now(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        db_1.db.push(newVideo);
        res.status(201).send(newVideo);
    }
});
exports.videosRoutes.delete('/:id', (req, res) => {
    for (let i = 0; i < db_1.db.length; i++) {
        if (db_1.db[i].id === +req.params.id) {
            db_1.db.splice(i, 1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
});
