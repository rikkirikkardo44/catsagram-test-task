import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CARD_REDUCER_NODE, CardState} from "./card.reducer";

export const cardFeatureSelector = createFeatureSelector<CardState>(CARD_REDUCER_NODE);

export const cardListSelector = createSelector(
  cardFeatureSelector,
  state => state.cardList
);
