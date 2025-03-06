 type DBType = {
    videos:[{
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string []
    }]
 }

export const db: DBType = {
    videos : [{
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: 18,
        createdAt: "2025-03-02T13:16:19.258Z",
        publicationDate: "2025-03-02T13:16:19.258Z",
        availableResolutions: ["P144"]
    }]}


 export type errorsMessageTypes = {
    errorsMessages: {
        message: string,
        field: string
    }[]
 }






 export const arr: string[] = ['P144','P240','P360','P480','P720','P1080','P1440','P2160']