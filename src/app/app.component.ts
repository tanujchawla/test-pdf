import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('pdfviewer') pdfviewer : ElementRef;

  receivePdfData(event: string) {
    const contentType = 'application/pdf';
    this.pdfviewer.nativeElement.src = 'data:' + contentType + ';base64, ' + event;
  }
}
