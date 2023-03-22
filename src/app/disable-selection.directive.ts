import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '.notSelectable'
})
export class DisableSelectionDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.disableSelection();
  }

  private disableSelection() {
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, '-webkit-user-select', 'none');
    this.renderer.setStyle(element, '-moz-user-select', 'none');
    this.renderer.setStyle(element, '-ms-user-select', 'none');
    this.renderer.setStyle(element, 'user-select', 'none');
  }
}
