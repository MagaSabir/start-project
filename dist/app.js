"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const settings_1 = require("./settings");
const db_1 = require("./db/db");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const arr = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
exports.app.get(settings_1.SETTINGS.PATH.videos, (req, res) => {
    res.status(200).json(db_1.db);
});
exports.app.get(settings_1.SETTINGS.PATH.videos + '/:id', (req, res) => {
    const videoId = Number(req.params.id);
    let videos = db_1.db.find(v => +v.id === videoId);
    if (videos) {
        res.send(videos);
    }
    else {
        res.send(404);
    }
});
exports.app.post(settings_1.SETTINGS.PATH.videos, (req, res) => {
    const errors = {
        "errorsMesage": [
            {
                "message": 'error',
                "field": 'availableResolutions'
            }
        ]
    };
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
