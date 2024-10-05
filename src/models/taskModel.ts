import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface ITask extends Document {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "completed";
    user: string;
    skill: string;
    // content as object with key value pairs
    content: {
        [key: string]: any;
    };
}

const taskSchema: Schema = new Schema({
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    user: { type: String, ref: 'User' },
    skill: { type: String, ref: 'Skill' },
    content: { type: Object, required: true }
});

const Task = mongoose.model<ITask>("tasks", taskSchema);
export default Task;