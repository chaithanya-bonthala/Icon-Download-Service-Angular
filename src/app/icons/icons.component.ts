import { Component, ViewChild, ElementRef, NgZone, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate}from '@angular/animations';
import { IconsService } from './icons.service';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({ 
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  animations: [
    trigger('slideUpDown', [
      state('slide-up', style({
        transform: 'translate3d(0%, 0%, 0)',
        opacity: 1
      })),
      state('slide-down', style({
        transform: 'translate3d(0, 100%, 0)',
        opacity: 0
      })),
      transition('slide-down => slide-up', animate('400ms ease-in-out')),
      transition('slide-up => slide-down', animate('400ms ease-in-out'))
    ]),
  ]
}) 
export class IconsComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Icon Library';
  items = [];
  searchSchemaClass = [];
  @ViewChild('input', { static: true }) inputElRef: ElementRef;
  keyupSub:  Subscription;
  inputText: string = '';
  searchResults: any = [];
  drawerMenuState:string = 'slide-down';
  selectedIcon;
  constructor(private iconsService: IconsService, private ngzone: NgZone, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.items = this.iconsService.items;
  }  
  toggleMenu(iconDetails) {
    this.selectedIcon = iconDetails;
    this.drawerMenuState = "slide-up";
  }
  closeClick(event) {
    this.drawerMenuState = "slide-down";
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
              item.icons.forEach((icon) => {
                // TO MAKE SEARCH NOT CASE SENSITIVE USE CODE BELOW 
                // if(icon.iconLabel.toLowerCase().indexOf(this.inputText.toLowerCase()) !== -1)
                let segments: Array<string> = icon.iconLabel.split("-");
                
                // TODO: call shift to remove first element of the segments array i.e: "icon"
                //segments.shift();
                let isSelected: boolean = false;

                segments.forEach((segment) => {
                  if(!isSelected && segment.substring(0, this.inputText.length) === this.inputText) {
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
}