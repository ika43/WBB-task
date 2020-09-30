import mongoose, { Schema } from 'mongoose';
import { IPersonModel } from './person.interface';

const PersonSchema: Schema = new Schema({
    name: { type: String, trim: true, index: true },
    count: { type: Number }
});

export default mongoose.model<IPersonModel>('Person', PersonSchema);