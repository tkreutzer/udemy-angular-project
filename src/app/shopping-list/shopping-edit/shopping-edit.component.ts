import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  actionName = 'Add';

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.changeAction(true);
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    console.log(form.value);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.changeAction(false);
    this.slForm.reset();
  }

  onDeleteItem() {
    this.changeAction(false);
    this.slForm.reset();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  onClear() {
    this.slForm.reset();
    this.changeAction(false);
  }

  changeAction(editing: boolean) {
    if (editing === true) {
      this.editMode = true;
      this.actionName = 'Update';
    } else {
      this.editMode = false;
      this.actionName = 'Add';
    }
  }
}
