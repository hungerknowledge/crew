import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() label: string;
  @Input() options: string[] = [];
  @Output() customSelect = new EventEmitter<string[]>();
  selectedOptions: string[] = [];
  isActive = false;

  @HostListener('document:click', ['$event']) clickOutside(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isActive = false;
    }
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  select(option: string): void {
    if (this.selectedOptions.includes(option)) {
      const index = this.selectedOptions.indexOf(option);
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    this.customSelect.emit(this.selectedOptions);
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }
}
