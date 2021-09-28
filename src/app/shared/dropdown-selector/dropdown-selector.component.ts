import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

export type Option = {
  label: string;
  value: any;
}

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss']
})
export class DropdownSelectorComponent implements OnChanges {
  @Input() options: Option[] = [];
  @Input() selectedValue: string;
  selectedLabel: string;
  @Input() style: string = 'normal';
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges({ selectedValue }: SimpleChanges) {
    this.selectedLabel = this.calculateLabelByValue(selectedValue?.currentValue);
  }

  selectOption(option: Option) {
    this.selectedLabel = option.label;
    this.optionSelected.emit(option.value);
  }

  otherOptions(): Option[] {
    return (this.options || []).filter(op => op.label !== this.selectedLabel);
  }

  private calculateLabelByValue(value: any) {
    const label = value ? this.options?.find(op => op.value === value)?.label : '';
    return label || this.options && this.options[0].label || '';
  }

}
