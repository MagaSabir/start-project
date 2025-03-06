import exrpess, {Request, Response} from 'express';
import {SETTINGS} from "./settings";
import {videosRoutes} from "./routes/route";


export const app = exrpess();
app.use(exrpess.json())
app.use(SETTINGS.PATH.videos, videosRoutes)

app.use(SETTINGS.PATH.db, videosRoutes)

