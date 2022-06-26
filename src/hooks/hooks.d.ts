declare module 'leaflet' { 
    export type validationDescription = {
        type?: string,
        isEmpty?: boolean,
        minLength?: number,
        maxLength?: number,
        spaces?: number,
        words?: number,
        mail?: string,
        phone?: string,
        date?: string,
        minLengthMessage?: number,
        maxLengthMessage?: number
    }
 }