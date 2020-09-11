import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {CardState} from "../modules/card/store/card/card.reducer";
import {Store} from "@ngrx/store";
import {CardCreateAction} from "../modules/card/store/card/card.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-card-form',
  templateUrl: './create-card-form.component.html',
  styleUrls: ['./create-card-form.component.scss']
})
export class CreateCardFormComponent {
  validator = {
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  }

  constructor(private store$: Store<CardState>, private router: Router) {
  }
  onSubmit(): void {
    this.store$.dispatch(new CardCreateAction({
      name: this.validator.name.value,
      description: this.validator.description.value,
      img: this.validator.img.value
    }))
    this.router.navigate(['']);
  }
}
