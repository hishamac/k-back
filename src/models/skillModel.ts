import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface Skill extends Document {
    _id: String;
    title: string;
    description: string;
    statusPercent: number;
    imageUrl: string;
}

const skillSchema: Schema = new Schema({
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    statusPercent: { type: Number, required: true },
    imageUrl: { type: String },
});

const Skill = mongoose.model<Skill>("skills", skillSchema);
export default Skill;