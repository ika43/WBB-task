import { Document } from 'mongoose';

export interface IPersonModel extends Document {
    name: string,
    count: number
}

export interface IPerson {
    name: string,
    count: number
}