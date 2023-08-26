import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    price: string
    @Prop({ required: true })
    image: string
    @Prop({ required: true })
    description: string
    @Prop({ required: true })
    featured: boolean
    @Prop({ required: false })
    code?: string
    @Prop({ required: false })
    oldPrice?: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)