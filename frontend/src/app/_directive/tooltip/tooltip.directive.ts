import {AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
declare var bootstrap: any;

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnChanges {

  @Input('appTooltip') tooltipTitle: string = '';
  private tooltipInstance: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.createTooltip();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tooltipTitle'] && !changes['tooltipTitle'].isFirstChange()) {
      // destroy régi tooltip
      if (this.tooltipInstance) {
        this.tooltipInstance.dispose();
      }
      // create új tooltip az új szöveggel
      this.createTooltip();
    }
  }

  private createTooltip() {
    this.tooltipInstance = new bootstrap.Tooltip(this.el.nativeElement, {
      title: this.tooltipTitle
    });
  }

  ngOnDestroy() {
    if (this.tooltipInstance) {
      this.tooltipInstance.dispose();
    }
  }
}
