import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

import { Option } from '@app/shared/models';


@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss']
})
export class DropdownSelectorComponent implements OnChanges {
  @Input() options: Option[] = [];
  @Input() selectedValue: string;
  @Input() emitFullOption: boolean = false;
  @Input() style: string = 'normal';
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
  selectedLabel: string;

  ngOnChanges({ selectedValue }: SimpleChanges) {
    this.selectedLabel = this.calculateLabelByValue(selectedValue?.currentValue);
  }

  selectOption(option: Option) {
    this.selectedLabel = option.label;
    this.optionSelected.emit(this.emitFullOption ? option : option.value);
  }

  otherOptions(): Option[] {
    return (this.options || []).filter(op => op.label !== this.selectedLabel);
  }

  private calculateLabelByValue(value: any) {
    const label = value ? this.options?.find(op => op.value === value)?.label : '';
    return label || this.options && this.options[0].label || '';
  }

}
