import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icon } from 'src/app/models/icon';

@Component({
  selector: 'app-icon-drawer',
  templateUrl: './icon-drawer.component.html',
  styleUrls: ['./icon-drawer.component.scss']
})
export class IconDrawerComponent implements OnInit, OnChanges {

  public copyButtonLabel = "Copy";

  @Input() icon!: Icon;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.icon.firstChange) {
      this.copyButtonLabel = "Copy";
    }
  }

  closeClickHandler() {
    this.close.emit();
  }

  copyInputText(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.copyButtonLabel = "Copied";
  }

  downloadIcon(fileType: string, fileName: string) {
    // TODO: Fix the file names and the path to the images
    // Below is a hack to make the image download work temporarily
    // HACK START
    const serverPath = location.origin + "/assets/icons/" + fileType + fileName.replace("icon-", "/") + "." + fileType;
    // HACK END
    this.http.get(`${serverPath}`, { responseType: 'arraybuffer' }).subscribe(
      (result: ArrayBuffer) => { this.saveData(result, fileName, fileType) },
      err => console.log(err)
    )
  }

  getFontUnicode(className: string): string {
    let tempElement = document.createElement("i");
    tempElement.className = className;
    document.body.appendChild(tempElement);
    let character = window.getComputedStyle(tempElement, ':before')
      .content.replace(/'|"/g, '');
    tempElement.remove();
    return "\\" + character.charCodeAt(0).toString(16);
  }

  private saveData = (function () {
    let a: any = document.createElement("a");
    a.setAttribute("style", "display: none;");
    document.body.appendChild(a);
    return function (data: BlobPart, fileName: string, fileType: string) {
      const blob = new Blob([data], { type: 'image/' + fileType });
      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, fileName + "." + fileType);
      } else {
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName + "." + fileType;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    };
  }());
}