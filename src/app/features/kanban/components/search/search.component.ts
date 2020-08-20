import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() autocompleteItems: string[] = [];
  @Output() customSelect = new EventEmitter<string[]>();

  filteredItems: string[];
  selectedItems: string[] = [];

  @HostListener('document:click', ['$event']) clickOutside(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.filteredItems = [];
    }
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  showTagOptions(event: InputEvent): void {
    const text = (event.target as HTMLInputElement).value;

    if (text) {
      this.filteredItems = this.autocompleteItems.filter((item) => {
        return item.toLowerCase().indexOf(text.toLowerCase()) >= 0 && !this.selectedItems.includes(item);
      });
    } else {
      this.filteredItems = [];
    }
  }

  select(item: string): void {
    this.filteredItems = [];
    this.selectedItems.push(item);
    this.customSelect.emit(this.selectedItems);

    if (this.searchInput && this.searchInput.nativeElement && this.searchInput.nativeElement.value) {
      this.searchInput.nativeElement.value = '';
    }
  }

  remove(item: string): void {
    const index = this.selectedItems.indexOf(item);
    this.selectedItems.splice(index, 1);
    this.customSelect.emit(this.selectedItems);
  }

}
