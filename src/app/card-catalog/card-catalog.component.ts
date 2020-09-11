import { Component } from '@angular/core';
import {Card} from "../modules/card/model/card";
import {select, Store} from "@ngrx/store";
import {CardState} from "../modules/card/store/card/card.reducer";
import {cardListSelector} from "../modules/card/store/card/card.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-card-catalog',
  templateUrl: './card-catalog.component.html',
  styleUrls: ['./card-catalog.component.scss']
})
export class CardCatalogComponent {

  cardList$: Observable<Card[]> = this.store$.pipe(select(cardListSelector));

  constructor(private store$: Store<CardState>) {

  }
}
