import {Action} from "@ngrx/store";

export enum cardActionsType {
  create = '[CARD] create card item',
  like = '[CARD] press card like button',
  delete = '[CARD] delete card item',
  edit = '[CARD] edit card item'
}

export class CardCreateAction implements Action {
  readonly type = cardActionsType.create;
  constructor(public payload: {name: string, img: string, description: string}) {
  }
}

export class CardLikeAction implements Action {
  readonly type = cardActionsType.like;
  constructor(public payload: {_id: string}) {
  }
}

export class CardDeleteAction implements Action {
  readonly type = cardActionsType.delete;
  constructor(public payload: {_id: string}) {
  }
}

export class CardEditAction implements Action {
  readonly type = cardActionsType.edit;
  constructor(public payload: {_id: string, name: string, img: string, description: string}) {
  }
}

export type CardActions = CardCreateAction | CardLikeAction | CardDeleteAction | CardEditAction;
