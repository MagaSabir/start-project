import {config} from "dotenv";

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3001,
    PATH: {
        videos: '/videos',
        db: '/testing/all-data'
    },
}