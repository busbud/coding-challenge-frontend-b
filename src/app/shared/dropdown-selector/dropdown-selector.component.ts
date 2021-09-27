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
  @Input() selected: string;
  @Input() shortStyle: boolean = false;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(!this.selected) {
      this.selected = this.options[0].label;
    }
  }

  selectOption(option: Option) {
    this.selected = option.label;
    this.optionSelected.emit(option.value);
  }

  otherOptions(): Option[] {
    return this.options.filter(op => op.label !== this.selected);
  }

}
