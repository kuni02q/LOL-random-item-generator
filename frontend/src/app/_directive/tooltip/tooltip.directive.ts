import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
declare var bootstrap: any;

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements AfterViewInit {

  @Input('appTooltip') tooltipTitle: string = '';

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    new bootstrap.Tooltip(this.el.nativeElement, {
      title: this.tooltipTitle
    });
  }
}
