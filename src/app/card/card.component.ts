import {Component, Input} from '@angular/core';
import {Card} from "../modules/card/model/card";
import {Store} from "@ngrx/store";
import {CardState} from "../modules/card/store/card/card.reducer";
import {CardLikeAction} from "../modules/card/store/card/card.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;
  @Input() index: number;

  constructor(private store$: Store<CardState>, private router: Router) {
  }

  onLike(id): void {
    this.store$.dispatch(new CardLikeAction({_id: id}));
  }

  onInfo(): void {
    this.router.navigate(['/info'], {
      queryParams: {
        idx: this.index,
        id: this.card._id
      }
    });
  }
}
