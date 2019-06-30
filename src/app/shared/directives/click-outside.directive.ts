import {
  Directive,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  private excludedClassesList: string[] = [];
  @Input() set excludedClasses(classes: string) {
    this.excludedClassesList = this.getExludedClassesList(classes);
    console.log(this.excludedClassesList);
  }
  @Output() clickedOutside: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    if (
      !this.elRef.nativeElement.contains(event.target) &&
      !this.shouldExclude(event.target as HTMLElement)
    ) {
      this.clickedOutside.emit(true);
    }
  }

  private shouldExclude(target: HTMLElement) {
    return (
      this.excludedClassesList.filter(className =>
        target.classList.contains(className)
      ).length > 0
    );
  }

  getExludedClassesList(classes: string): string[] {
    return classes.split(',');
  }
}
