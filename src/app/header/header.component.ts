import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(selected: string) {
    this.featureSelected.emit(selected);
  }
}
