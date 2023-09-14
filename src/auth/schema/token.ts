import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type TokenDocument = Token & Document

@Schema()
export class Token {
    @Prop({ required: true })
    accessToken: string;
    @Prop({ required: true })
    email: string
    @Prop({ required: true, default: Date.now() })
    createdAt: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)