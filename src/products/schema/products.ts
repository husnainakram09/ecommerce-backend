import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

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
    @Prop({ required: true, default: false })
    featured: boolean
    @Prop({ required: false, default: null })
    code?: string | null
    @Prop({ required: false, default: null })
    oldPrice?: string | null
    @Prop({ required: true, default: Date.now(), type: Date })
    createdAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)