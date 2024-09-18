import { Document } from 'mongoose';
export declare class User {
    name: string;
    email: string;
    password: string;
}
export type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any>, undefined, {}>;
