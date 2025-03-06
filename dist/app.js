"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const settings_1 = require("./settings");
const route_1 = require("./routes/route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(settings_1.SETTINGS.PATH.videos, route_1.videosRoutes);
exports.app.use(settings_1.SETTINGS.PATH.db, route_1.videosRoutes);
