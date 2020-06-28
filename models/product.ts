export const DELETE_PRODUCT = "DELETE_PRODUCT"

export interface DeleteProduct {
  type: "DELETE_PRODUCT"
  payload: string
}

export default class Product {
  public id: string
  public ownerId: string
  public title: string
  public imageUrl: string
  public description: string
  public price: number

  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}