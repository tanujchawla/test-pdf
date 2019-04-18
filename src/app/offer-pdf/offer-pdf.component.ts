import { Component, Output, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import html2pdf from 'html2pdf.js';
import { PDFConvertor } from '../pdf-convertor.service';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'offer-pdf',
    templateUrl: './offer-pdf.component.html',
    styleUrls: ['offer-pdf.component.css']
})
export class OfferPdf implements OnInit, AfterViewInit {

    pdfData: string;

    base_url: string;



    @Output() pdfGeneratedEvent = new EventEmitter<string>();

    constructor(private pdfConvertor: PDFConvertor, platformLocation: PlatformLocation) {
        this.base_url = (platformLocation as any).location.href;
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        const data = document.getElementById('htmlContent');

        const style = `*{line-height: 2; margin:0px;padding:0px; -webkit-box-sizing:border-box; -webkit-print-color-adjust: exact; -moz-box-sizing:border-box;box-sizing:border-box;} 
        html{font-size:16px;}
        @font-face {
            font-family: 'Zurich_BT_regular';
            src: url('http://localhost:4200/assets/fonts/ZURCHN_0.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
        #annex {}
        body {font-family:Zurich_BT_regular;}
        table { page-break-inside : avoid;}
        .header { page-break-before: always;}
        .footerText {font-family: Zurich_BT_regular;font-size:13px;line-height:21px}
        table.border td { border-bottom:0.2px solid #666;border-right:0.2px solid #666}
        table.border { border:0.2px solid #666;}
        table.border td:last-child { border-right:0 solid #666;}
        a{color: #fa8300; border:0;text-decoration: underline;margin:0px;padding:0px;}
        u{ margin:0px;padding:0px;}
        a:hover{ color:#E77817; text-decoration:none;}
        .listdisc{ list-style:disc; margin-left: 30px;}
        .numberList{ list-style:decimal; margin-left: 30px;margin-bottom:30px;}
        .listabc{ list-style:lower-alpha; margin-left: 18px;margin-bottom:30px;}
        .listabc li,.numberList li,.listRoman li,.listdisc li{padding-left:15px; margin-bottom:25px;}
        .nobotmar li{margin-bottom:0;}
        .listRoman{list-style:lower-roman; margin-left: 18px;margin-bottom:30px;}
        .font-weight-bold {font-weight: 700 !important;font-size: 15px;}
        p.pText{font-family:'Zurich_BT_regular';font-size:15px;color: #4a4a4a; line-height:21px; text-align: justify;}
        p.proceedText{font-family:'Zurich_BT_regular';font-size:15px;line-height:21px}
        .maxw-850{width:100%; margin: auto;}
        table{font-family: Zurich_BT_regular;}
        td.tdText{padding:5px;font-family: Zurich_BT_regular;font-size:14px;color: #4a4a4a; line-height:21px}
        h2.h2Text{font-size:21px; text-align: center; padding: 10px;}
        td.tdTextTitle{background-color:#053c6d; font-size: 18px; color: #fff; padding: 6px;}
        .starText{font-size:12px;color: #4a4a4a;line-height: 14px;}`;

        // @page { margin-top:20px; margin-bottom:20px; margin-left:20px; margin-right:20px;}

        // const options = {
        //     filename: 'OfferPDF.pdf',
        //     pagebreak: { avoid : ['avoid-all']},
        //     html2canvas : {
        //         scale : 1
        //     },
        //     margin : [20, 0],
        //     jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
        // }
        // html2pdf().set(options).from(data).outputPdf()
        // .then((data) => {
        //     this.pdfData = btoa(data);
        //     this.pdfGeneratedEvent.emit(this.pdfData);
        // });

        const html_str = `<html><head><style>${style}</style></head><body>${data.innerHTML}</body></html>`;

        this.pdfConvertor.getPDFData(style, html_str)
            .subscribe((data: any) => {
                this.pdfData = data.data;
                this.pdfGeneratedEvent.emit(this.pdfData);
            });
    }
}