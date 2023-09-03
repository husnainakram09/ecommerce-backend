import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TokenDocument = Token & Document

@Schema()
export class Token {
    @Prop({ required: true })
    accessToken: string;
    @Prop({ required: true })
    username: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)