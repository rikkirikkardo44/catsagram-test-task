import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {CARD_REDUCER_NODE, cardReducer} from "./store/card/card.reducer";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(CARD_REDUCER_NODE, cardReducer),
  ]
})
export class CardModule { }
