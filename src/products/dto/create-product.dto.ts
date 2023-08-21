import { ObjectId } from "mongoose"

export class CreateProductDto {
    name: string
    price: string | number
    image: string
    description: string
    newArrival: boolean
    bestSeller: boolean
    featured: boolean
    specialOffer: boolean
    oldPrice?: string | number
    category: string
}
