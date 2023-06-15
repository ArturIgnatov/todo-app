import {
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appChangeDetection]'
})
export class ChangeDetectionDirective {
  @Input() value1: any;

  constructor(private elRef: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.elRef.nativeElement.children[0].style.margin = '4px 6px'
  }

  @HostListener('mouseleave')
  onMouseOver() {
   this.elRef.nativeElement.children[0].style.margin = null
  }
}
