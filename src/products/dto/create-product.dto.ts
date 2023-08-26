import { ObjectId } from "mongoose"

export class CreateProductDto {
    name: string
    price: string
    image: string
    description: string
    featured: boolean
    oldPrice?: string
}
