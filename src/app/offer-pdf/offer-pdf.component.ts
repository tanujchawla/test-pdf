import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import html2pdf from 'html2pdf.js';

@Component({
    selector: 'offer-pdf',
    templateUrl: './offer-pdf.component.html',
    styleUrls: ['offer-pdf.component.css']
})
export class OfferPdf implements OnInit {

    pdfData: string;

    @Output() pdfGeneratedEvent = new EventEmitter<string>();

    ngOnInit() {

        const data =  document.getElementById('htmlContent');
        
        const options = {
            filename: 'OfferPDF.pdf',
            pagebreak: { avoid : ['avoid-all']},
            html2canvas : {
                scale : 1
            },
            margin : [20, 0],
            jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
        }
        html2pdf().set(options).from(data).outputPdf()
        .then((data) => {
            this.pdfData = btoa(data);
            this.pdfGeneratedEvent.emit(this.pdfData);
        });
    }
}