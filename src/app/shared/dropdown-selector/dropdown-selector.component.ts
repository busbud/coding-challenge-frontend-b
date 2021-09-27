import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

export type Option = {
  label: string;
  value: any;
}

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss']
})
export class DropdownSelectorComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() selectedValue: string;
  selectedLabel: string;
  @Input() shortStyle: boolean = false;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.selectedValue) {
      this.selectedLabel = this.options?.find(op => op.value === this.selectedValue)?.label || '';
    } else {
      this.selectedLabel = this.options && this.options[0].label || '';
    }
  }

  selectOption(option: Option) {
    this.selectedLabel = option.label;
    this.optionSelected.emit(option.value);
  }

  otherOptions(): Option[] {
    return (this.options || []).filter(op => op.label !== this.selectedLabel);
  }

}
