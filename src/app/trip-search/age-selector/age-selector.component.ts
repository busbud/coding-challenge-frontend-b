import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-age-selector',
  templateUrl: './age-selector.component.html',
  styleUrls: ['./age-selector.component.scss']
})
export class AgeSelectorComponent {

  @Input() title: string = '';
  @Input() value: number = 0;
  @Output() valueUpdated: EventEmitter<number> = new EventEmitter();

  constructor() { }

  decreaseValue() {
    this.valueUpdated.emit(this.value - 1);
  }

  increaseValue() {
    this.valueUpdated.emit(this.value + 1);
  }

}
