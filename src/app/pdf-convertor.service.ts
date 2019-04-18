import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PDFConvertor {

    url: string = 'http://localhost:3001/generatePdf';

    constructor(private http: HttpClient) { }

    getPDFData(style: string, content: string) {
        return this.http.post(this.url, { content: content, style: style });
    }
}