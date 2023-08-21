import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop()
    name: string;
    @Prop()
    price: string
    @Prop()
    image: string
    @Prop()
    description: string
    @Prop()
    newArrival: boolean
    @Prop()
    bestSeller: boolean
    @Prop()
    featured: boolean
    @Prop()
    specialOffer: boolean
    @Prop()
    oldPrice?: string
    @Prop()
    category: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)