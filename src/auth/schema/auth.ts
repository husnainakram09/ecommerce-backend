import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    password: string
    @Prop({ required: true })
    username: string
    @Prop({ required: true, default: Date.now(), type: Date })
    createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)