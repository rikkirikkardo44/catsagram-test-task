import {Card} from "../../model/card";
import data from "../../../../../assets/cats.json";
import {CardActions, cardActionsType} from "./card.actions";

export const CARD_REDUCER_NODE = 'card';

export interface CardState {
  idIncrement: string,
  cardList: Card[]
}

const initData = data.map((item) => {
  const newLike = {like: {count: item.like, liked: false}};
  return {...item, ...newLike};
});

const getId = () => {
  return `${Date.now()}`
};

const initialState: CardState = {
  idIncrement: getId(),
  cardList: initData
}

export const cardReducer = (state = initialState, action: CardActions) => {
  switch (action.type) {
    case cardActionsType.create:
      return {
        ...state,
        idIncrement: getId(),
        cardList: [
          ...state.cardList,
          {
            _id: state.idIncrement,
            name: action.payload.name,
            img: action.payload.img,
            description: action.payload.description,
            like: {count: 0, liked: false}
          }
        ]
      };
    case cardActionsType.like:
      return {
        ...state,
        idIncrement: getId(),
        cardList: state.cardList.map((card) => {
          if (card._id === action.payload._id) {
            const newCount: number = card.like.liked ? card.like.count - 1 : card.like.count + 1;
            const newCard: Card = {
              _id: card._id,
              name: card.name,
              img: card.img,
              description: card.description,
              like: {count: newCount, liked: !card.like.liked}
            }
            return newCard;
          }
          return card;
        })
      }
    case cardActionsType.delete:
      return {
        ...state,
        idIncrement: getId(),
        cardList: state.cardList.filter((card) => card._id !== action.payload._id),
      };
    case cardActionsType.edit:
      return {
        ...state,
        idIncrement: getId(),
        cardList: state.cardList.map((card) => {
          if (card._id === action.payload._id) {
            const newCard: Card = {
              like: card.like,
              name: action.payload.name,
              description: action.payload.description,
              img: action.payload.img,
              _id: card._id
            }
            return newCard;
          }
          return card;
        })
      }
    default:
      return state;
  }
}
