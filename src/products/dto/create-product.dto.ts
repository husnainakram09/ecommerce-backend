export class CreateProductDto {
    name: string
    price: string
    image: string
    description: string
    featured: boolean
    oldPrice?: string
    code?: string
}
