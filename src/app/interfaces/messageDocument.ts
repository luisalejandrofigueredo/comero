export interface MessageDocument {
    "id": string,
    "hour":number,
    "to":string,
    "from":string,
    "message":string,
    "_meta": {
    },
    "_deleted": boolean,
    "_attachments": {},
    "_rev"?: string
}
