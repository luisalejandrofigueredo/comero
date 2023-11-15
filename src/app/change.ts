export interface Change {
        "eventId": string,
        "documentId": string,
        "collectionName": string,
        "startTime": number,
        "endTime": number,
        "isLocal": boolean,
        "operation": string,
        "documentData": {
            "id": string,
            "bloodPressureMax": number,
            "bloodPressureMin": number,
            "pulse": number,
            "_meta": {
                "lwt": number
            },
            "_deleted": boolean,
            "_attachments": {},
            "_rev": string
        }
}
