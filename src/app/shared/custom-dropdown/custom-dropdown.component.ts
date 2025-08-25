import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterPipe } from '../../core/pipes/employee-filter.pipe';

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterPipe],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ]
})
export class CustomDropdownComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select...';
  @Input() items: any[] = [];
  @Input() bindLabel: string = 'Text';
  @Input() bindValue: string = 'Value';
  @Input() loading: boolean = false;

  @Input() selectedItem: any = null;
  @Output() selectedItemChange = new EventEmitter<any>();

  dropdownOpen = false;
  searchTerm: string = '';

  // ControlValueAccessor
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
    this.onChange(item ? item[this.bindValue] : null);
    this.onTouched();
    this.dropdownOpen = false;
  }

  // ControlValueAccessor Methods
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.selectedItem = this.items.find(i => i[this.bindValue] === value) || null;
    } else {
      this.selectedItem = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
