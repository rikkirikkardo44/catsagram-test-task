export interface Card {
  _id: string,
  name: string,
  img: string,
  like: {count: number, liked: boolean},
  description: string
}
