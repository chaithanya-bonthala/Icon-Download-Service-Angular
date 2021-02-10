import { Component, ViewChild, ElementRef, NgZone, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { IconsService } from './icons.service';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Icon, IconItems } from '../models/icon';
import { PanelComponent } from '../panel/panel.component';
import { IPanelConfig } from '../panel/panel.constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Icon Library';
  items: IconItems[] = [];
  searchSchemaClass = [];

  keyupSub: Subscription = new Subscription;
  inputText: string = '';
  searchResults: any = [];
  drawerMenuState: string = 'slide-down';
  selectedIcon!: Icon;
  public defaultPanelConfig: IPanelConfig = {
    hasOverlay: false,
    bodyContainerClass: 'my-default-body',
    headerContainerClass: 'my-default-header'
  }

  @ViewChild('input', { static: false }) inputElRef!: ElementRef;
  @ViewChild('panel') panelElRef!: PanelComponent;

  constructor(
    private iconsService: IconsService,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private http: HttpClient) { }

  ngOnInit() {
    this.items = this.iconsService.items;
  }

  ngAfterViewInit() {
    // RUN SEARCH FUNCTIONALITY OUTSIDE THE ANGULAR CHANGE DETECTION
    // ONCE SEARCH RESULTS ARE COMPILED THEN RUN CHANGE DETECTION
    this.ngzone.runOutsideAngular(() => {
      this.keyupSub = fromEvent(this.inputElRef.nativeElement, 'keyup')
        .pipe(debounceTime(500))
        .subscribe((event: any) => {
          this.ngzone.run(() => {
            this.searchResults = [];
            this.inputText = event.target.value.trim();
            this.items.forEach((item, index) => {
              item.icons.forEach((icon: Icon) => {
                // TO MAKE SEARCH NOT CASE SENSITIVE USE CODE BELOW
                // if(icon.iconLabel.toLowerCase().indexOf(this.inputText.toLowerCase()) !== -1)
                let segments: Array<string> = icon.iconLabel.split("-");

                // TODO: call shift to remove first element of the segments array i.e: "icon"
                //segments.shift();
                let isSelected: boolean = false;

                segments.forEach((segment) => {
                  if (!isSelected && segment.substring(0, this.inputText.length) === this.inputText) {
                    isSelected = true;
                    this.searchResults.push(icon)
                  }
                })
              })
            })
          })
          this.cdref.detectChanges();
        });
    })
  }

  ngOnDestroy() {
    this.keyupSub.unsubscribe();
  }

  public togglePanel(iconDetails: Icon) {
    this.selectedIcon = iconDetails;
    this.panelElRef.open();
    // this.drawerMenuState = "slide-up";
  }

  public closeClick(event: any) {
    this.panelElRef.close();
    // this.drawerMenuState = "slide-down";
  }

  public downloadIcon(fileType: string, fileName: string) {
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
