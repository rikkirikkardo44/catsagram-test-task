import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Card} from "../modules/card/model/card";
import {select, Store} from "@ngrx/store";
import {cardListSelector} from "../modules/card/store/card/card.selectors";
import {CardState} from "../modules/card/store/card/card.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {CardEditAction} from "../modules/card/store/card/card.actions";

@Component({
  selector: 'app-edit-card-form',
  templateUrl: './edit-card-form.component.html',
  styleUrls: ['./edit-card-form.component.scss']
})
export class EditCardFormComponent implements OnInit {

  validator;
  id: string;

  idx: number;
  cardList$: Observable<Card[]> = this.store$.pipe(select(cardListSelector));
  private tagStateSubscription: Subscription;

  constructor(private store$: Store<CardState>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(p => {
        this.idx = p.idx
      })

    this.tagStateSubscription = this.cardList$.subscribe((state) => {
      this.validator =
        {
          name: new FormControl(state[this.idx].name, [Validators.required]),
          img: new FormControl(state[this.idx].img, [Validators.required]),
          description: new FormControl(state[this.idx].description, [Validators.required])
        };
      this.id = state[this.idx]._id;
    })
  }

  onSubmit() {
    this.store$.dispatch(new CardEditAction({
      name: this.validator.name.value,
      description: this.validator.description.value,
      img: this.validator.img.value,
      _id: this.id
    }))
    this.router.navigate(['']);
  }

}
