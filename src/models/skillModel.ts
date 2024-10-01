import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface Skill extends Document {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
}

const skillSchema: Schema = new Schema({
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
});

const Skill = mongoose.model<Skill>("skills", skillSchema);
export default Skill;